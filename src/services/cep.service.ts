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
    // Passo 1: Busca dados básicos do CEP na ViaCEP
    const viaCEPResponse = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    
    if (viaCEPResponse.data.erro) {
      throw new Error('CEP não encontrado');
    }

    // Passo 2: Monta o endereço completo para geocoding
    const endereco = `${viaCEPResponse.data.logradouro}, ${viaCEPResponse.data.localidade}, ${viaCEPResponse.data.uf}`;

    // Passo 3: Busca coordenadas reais no OpenStreetMap
    const osmResponse = await axios.get(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(endereco)}`
    );

    if (!osmResponse.data[0]) {
      throw new Error('Coordenadas não encontradas para este CEP');
    }

    // Passo 4: Retorna dados com coordenadas reais
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