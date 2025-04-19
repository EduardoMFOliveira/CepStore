// src/shared/clients/melhor-envio.client.ts
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';

export interface ShippingOption {
  type: string;
  price: number;
  deliveryTime: string;
}

@Injectable()
export class MelhorEnvioClient {
  private readonly logger = new Logger(MelhorEnvioClient.name);
  private readonly http: AxiosInstance;

  constructor(private configService: ConfigService) {
    this.http = axios.create({
      baseURL:
        this.configService.get<string>('MELHOR_ENVIO_BASE_URL') ||
        'https://melhorenvio.com.br/api/v2',
      headers: {
        Authorization: `Bearer ${this.configService.get<string>(
          'MELHOR_ENVIO_ACCESS_TOKEN',
        )}`,
        'User-Agent': `${this.configService.get<string>('APP_NAME')}/1.0`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });
  }

  private getDefaultProducts() {
    return [
      {
        id: 'default',
        width: this.configService.get<number>('DEFAULT_PRODUCT_WIDTH'),
        height: this.configService.get<number>('DEFAULT_PRODUCT_HEIGHT'),
        length: this.configService.get<number>('DEFAULT_PRODUCT_LENGTH'),
        weight: this.configService.get<number>('DEFAULT_PRODUCT_WEIGHT'),
        quantity: 1,
      },
    ];
  }

  /**
   * Chama a API de cálculo de frete e retorna todas as opções fornecidas.
   */
  async calculateShipping(
    from: string,
    to: string,
  ): Promise<ShippingOption[]> {
    try {
      const response = await this.http.post('/me/shipment/calculate', {
        from: { postal_code: from },
        to: { postal_code: to },
        products: this.getDefaultProducts(),
        options: {
          insurance_value: 0,
          receipt: false,
          own_hand: false,
        },
      });

      return this.parseShippingOptions(response.data);
    } catch (error) {
      this.logger.error(`Erro no cálculo de frete: ${error.message}`, error.stack);
      // Em caso de falha, retorna placeholder
      return [
        {
          type: 'Indisponível',
          price: 0,
          deliveryTime: 'Consulte-nos',
        },
      ];
    }
  }

  /**
   * Mapeia cada serviço retornado, usando custom_price e custom_delivery_time quando disponíveis.
   */
  private parseShippingOptions(data: any[]): ShippingOption[] {
    return data.map((option) => {
      // Nome do serviço (por exemplo: "Melhor Envio PAC", "Melhor Envio Sedex", etc.)
      const typeName = option.name ?? 'Serviço Desconhecido';

      // Preço: privilegia custom_price, depois price; default 0
      const priceValue = Number(option.custom_price ?? option.price ?? 0);

      // Prazo: usa custom_delivery_time > delivery_time > fallback
      let deliveryStr: string;
      if (option.custom_delivery_time != null) {
        deliveryStr = `${option.custom_delivery_time} dias úteis`;
      } else if (option.delivery_time != null) {
        deliveryStr = `${option.delivery_time} dias úteis`;
      } else {
        deliveryStr = 'Consulte-nos';
      }

      return {
        type: typeName,
        price: priceValue,
        deliveryTime: deliveryStr,
      };
    });
  }
}
