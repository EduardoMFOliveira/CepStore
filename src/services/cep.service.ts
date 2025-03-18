// cep.service.ts
import axios from 'axios';
import logger from '../utils/logger';

interface CEPData {
  cep: string;
  logradouro: string;
  localidade: string;
  uf: string;
  latitude?: number;
  longitude?: number;
}

export async function fetchCEPData(cep: string): Promise<CEPData> {
  try {

    const viaCEPResponse = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    
    if (viaCEPResponse.data.erro) {
      throw new Error('CEP não encontrado');
    }

    const endereco = `${viaCEPResponse.data.logradouro}, ${viaCEPResponse.data.localidade}, ${viaCEPResponse.data.uf}`;

    const osmResponse = await axios.get(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(endereco)}`
    );

    if (!osmResponse.data[0]) {
      throw new Error('Coordenadas não encontradas para este CEP');
    }

    return {
      ...viaCEPResponse.data,
      latitude: parseFloat(osmResponse.data[0].lat),
      longitude: parseFloat(osmResponse.data[0].lon),
    };
  } catch (error) {
    logger.error(`Erro na busca do CEP ${cep}: ${error}`);
    throw error;
  }
}