import express, { Request, Response } from 'express';
import { fetchCEPData } from './services/cep.service';
import { findNearbyStores } from './services/store.service';
import { AppDataSource } from "./database/data-source";
import logger from './utils/logger';

const app = express();
const port = 3000;

AppDataSource.initialize()
    .then(() => {
        logger.info("Banco de dados conectado");
    })
    .catch((error) => {
        logger.error("Erro ao conectar ao banco de dados:", error);
    });

app.get('/stores/nearby', async (req: Request, res: Response) => {
    const { cep } = req.query;

    if (!cep || typeof cep !== 'string' || !/^\d{8}$/.test(cep)) {
        return res.status(400).json({ error: 'CEP inválido. Forneça um CEP com 8 dígitos.' });
    }

    try {
        const cepData = await fetchCEPData(cep);
        const nearbyStores = await findNearbyStores(cepData.latitude!, cepData.longitude!, 100);

        if (nearbyStores.length === 0) {
            return res.status(404).json({ message: 'Nenhuma loja encontrada em um raio de 100 km.' });
        }

        res.json({
            cep: cepData.cep,
            nearbyStores: nearbyStores.map(store => ({
                name: store.name,
                address: `${store.street}, ${store.number} - ${store.city}/${store.state}`,
                distance: `${store.distance?.toFixed(1)} km`
            }))
        });
    } catch (error) {
        if (error instanceof Error) {
            logger.error(`Erro: ${error.message}`);
            res.status(500).json({ error: error.message });
        } else {
            logger.error('Erro desconhecido:', error);
            res.status(500).json({ error: 'Erro interno' });
        }
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
