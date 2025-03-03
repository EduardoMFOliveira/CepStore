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
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    
    if (response.data.erro) {
      throw new Error('CEP não encontrado');
    }

    return {
        ...response.data,
        latitude: parseFloat((-8.06 + Math.random() * 0.1).toFixed(6)),
        longitude: parseFloat((-34.87 + Math.random() * 0.1).toFixed(6))
      };
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Erro na API ViaCEP: ${error.message}`);
    } else {
      logger.error('Erro desconhecido na API ViaCEP:', error);
    }
    throw error; 
  }
}