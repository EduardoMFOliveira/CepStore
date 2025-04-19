// src/seed/stores.seed.ts
import { Injectable } from '@nestjs/common';
import { Store } from '../modules/store/entities/store.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StoreSeedService {
  constructor(
    @InjectRepository(Store)
    private storeRepository: Repository<Store>
  ) {}

  async seed() {
    const capitals = [
      { name: 'Dudu Store - AC', city: 'Rio Branco',     state: 'AC', postalCode: '69900000', lat: -9.97472,   lng: -67.81   },
      { name: 'Dudu Store - AL', city: 'Maceió',         state: 'AL', postalCode: '57010000', lat: -9.647684, lng: -35.733926 },
      { name: 'Dudu Store - AP', city: 'Macapá',         state: 'AP', postalCode: '68900000', lat:  0.034,     lng: -51.050    },
      { name: 'Dudu Store - AM', city: 'Manaus',         state: 'AM', postalCode: '69000000', lat: -3.11903,  lng: -60.02173  },
      { name: 'Dudu Store - BA', city: 'Salvador',       state: 'BA', postalCode: '40000000', lat: -12.97139, lng: -38.50139  },
      { name: 'Dudu Store - CE', city: 'Fortaleza',      state: 'CE', postalCode: '60000000', lat: -3.71722,  lng: -38.54306  },
      { name: 'Dudu Store - DF', city: 'Brasília',       state: 'DF', postalCode: '70000000', lat: -15.79389, lng: -47.88278  },
      { name: 'Dudu Store - ES', city: 'Vitória',        state: 'ES', postalCode: '29000000', lat: -20.3155,  lng: -40.3128   },
      { name: 'Dudu Store - GO', city: 'Goiânia',        state: 'GO', postalCode: '74000000', lat: -16.6869,  lng: -49.2648   },
      { name: 'Dudu Store - MA', city: 'São Luís',       state: 'MA', postalCode: '65000000', lat: -2.53072,  lng: -44.30678  },
      { name: 'Dudu Store - MG', city: 'Belo Horizonte', state: 'MG', postalCode: '30000000', lat: -19.93333, lng: -43.93333  },
      { name: 'Dudu Store - MS', city: 'Campo Grande',    state: 'MS', postalCode: '79000000', lat: -20.44278, lng: -54.64651  },
      { name: 'Dudu Store - MT', city: 'Cuiabá',         state: 'MT', postalCode: '78000000', lat: -15.601,   lng: -56.09796  },
      { name: 'Dudu Store - PA', city: 'Belém',          state: 'PA', postalCode: '66000000', lat: -1.45583,  lng: -48.49019  },
      { name: 'Dudu Store - PB', city: 'João Pessoa',    state: 'PB', postalCode: '58000000', lat: -7.11949,  lng: -34.845    },
      { name: 'Dudu Store - PR', city: 'Curitiba',       state: 'PR', postalCode: '80000000', lat: -25.42838, lng: -49.2733   },
      { name: 'Dudu Store - RJ', city: 'Rio de Janeiro', state: 'RJ', postalCode: '20000000', lat: -22.90684, lng: -43.1729   },
      { name: 'Dudu Store - RN', city: 'Natal',          state: 'RN', postalCode: '59000000', lat: -5.79448,  lng: -35.211    },
      { name: 'Dudu Store - RO', city: 'Porto Velho',    state: 'RO', postalCode: '76800000', lat: -8.76116,  lng: -63.90004  },
      { name: 'Dudu Store - RR', city: 'Boa Vista',      state: 'RR', postalCode: '69300000', lat:  2.8236,    lng: -60.6758   },
      { name: 'Dudu Store - RS', city: 'Porto Alegre',    state: 'RS', postalCode: '90000000', lat: -30.03306, lng: -51.23     },
      { name: 'Dudu Store - SC', city: 'Florianópolis',   state: 'SC', postalCode: '88000000', lat: -27.59693, lng: -48.54953  },
      { name: 'Dudu Store - SE', city: 'Aracaju',        state: 'SE', postalCode: '49000000', lat: -10.94725, lng: -37.07306  },
      { name: 'Dudu Store - SP', city: 'São Paulo',      state: 'SP', postalCode: '01000000', lat: -23.55052, lng: -46.63331  },
      { name: 'Dudu Store - TO', city: 'Palmas',         state: 'TO', postalCode: '77000000', lat: -10.16263, lng: -48.33122  },
    ];

    await Promise.all(capitals.map(async (capital) => {
      const exists = await this.storeRepository.findOne({ where: { state: capital.state } });
      if (!exists) {
        await this.storeRepository.save({
          name: capital.name,
          city: capital.city,
          state: capital.state,
          postalCode: capital.postalCode,
          latitude: capital.lat,
          longitude: capital.lng,
          shippingTimeInDays: 1,
          type: 'LOJA',
        });
      }
    }));
  }
}
