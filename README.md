# 🚚 CEP Store & Delivery API

Uma API inteligente para cálculo de fretes e entrega baseada em proximidade geográfica, integrando com ViaCEP, Google Maps e Melhor Envio.

[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version: 1.0.0](https://img.shields.io/badge/Version-1.0.0-blue)]()

## ✨ Funcionalidades Principais

- ✅ **Validação de CEP** via API do ViaCEP
- 📍 **Geolocalização precisa** com Google Maps API
- 🏪 Busca de lojas em raio de **até 50km**
- 📦 Cálculo de fretes com Melhor Envio
- 🛵 Entrega rápida por motoboy (até 50km)
- 📮 Opções de Correios (PAC/Sedex) para distâncias maiores
- ⏱ Estimativa de tempo de entrega baseada em distância real
- 📊 Documentação automática com Swagger

## 🛠 Tecnologias Utilizadas

- **Backend**: NestJS
- **Banco de Dados**: TypeORM + SQLite (Padrão)
- **APIs Integradas**:
  - Google Maps Distance Matrix
  - ViaCEP
  - Melhor Envio
- **Validação**: Zod
- **Documentação**: Swagger UI
- **Cache**: NodeCache

## 🚀 Começando

### Pré-requisitos

- Node.js 16+
- NPM 8+
- Credenciais das APIs:
  - [Google Maps API Key](https://developers.google.com/maps)
  - [Token Melhor Envio](https://app.melhorenvio.com.br/integracoes/permissoes-de-acesso)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/cep-store.git

# Instale as dependências
npm install

# Crie e configure o arquivo .env na raiz do projeto
```

### ⚙ Configuração do .env

```
# Configurações Básicas
PORT=3000
NODE_ENV=development
DB_NAME=database.sqlite

# Integrações
GOOGLE_MAPS_API_KEY=sua_chave_aqui
MELHOR_ENVIO_ACCESS_TOKEN=seu_token_aqui

# Regras de Negócio
PDV_RADIUS=50
PDV_SHIPPING_PRICE=15
```

```bash
# Inicie o servidor
npm run start
```

## 📡 Endpoints da API

### GET /stores/by-cep
Busca lojas próximas com opções de frete

**Parâmetros**:
- `cep` (obrigatório): CEP de destino (8 dígitos)
- `radius`: Raio de busca em km (padrão: 50)

**Exemplo**:
```bash
curl http://localhost:3000/stores/by-cep?cep=01001000
```

### GET /stores/state/{uf}
Lista lojas por estado

**Exemplo**:
```bash
curl http://localhost:3000/stores/state/SP
```

### GET /stores/{id}
Detalhes completos de uma loja específica

## 📚 Documentação Interativa

Acesse a documentação completa via Swagger UI em:
```
http://localhost:3000/api
```

## 🧪 Exemplo de Resposta

```json
[
  {
    "name": "Loja Central",
    "city": "São Paulo",
    "postalCode": "01001000",
    "type": "PDV",
    "distance": "2.3 km",
    "shippingOptions": [
      {
        "type": "Motoboy",
        "price": 15.00,
        "deliveryTime": "1 dia útil"
      }
    ]
  }
]
```

## 🤝 Como Contribuir

1. Faça um Fork do projeto
2. Crie uma Branch (`git checkout -b feature/incrivel`)
3. Commit suas Mudanças (`git commit -m 'Add incrível feature'`)
4. Push para a Branch (`git push origin feature/incrivel`)
5. Abra um Pull Request

---

Feito com ❤️ por [Eduardo Oliveira]
