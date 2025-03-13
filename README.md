# CepStore

O **CepStore** é um projeto que permite buscar lojas próximas a um determinado CEP. Ele utiliza a API do ViaCEP para obter informações de endereço e calcula a distância entre o CEP fornecido e as lojas cadastradas em um banco de dados SQLite.

---

## Funcionalidades

- **Busca de Lojas Próximas**: Forneça um CEP e descubra quais lojas estão em um raio de 100 km.
- **Banco de Dados SQLite**: Armazena as informações das lojas de forma eficiente.
- **API REST**: Expõe uma API simples para consulta de lojas próximas.

---

## Como Rodar o Projeto

Siga os passos abaixo para rodar o projeto na sua máquina.

### Pré-requisitos

- Node.js (v18 ou superior)
- npm (v9 ou superior)
- Git (opcional)

### Passo 1: Clonar ou baixar o Repositório

```bash
git clone https://github.com/EduardoMFOliveira/CepStore.git
cd CepStore
```

### Passo 2: Instalar Dependências

```bash
npm install
```

### Passo 3: Popular o Banco de Dados

Execute o script de seed para popular o banco de dados com as lojas fictícias:

```bash
npx ts-node src/seed.ts
```

Isso criará o arquivo `database.sqlite` na raiz do projeto.

### Passo 4: Rodar o Servidor

Inicie o servidor:

```bash
npx ts-node src/server.ts
```

O servidor estará rodando em `http://localhost:3000`.

---

## Como Usar a API

### Endpoint: Buscar Lojas Próximas

- **Método**: GET
- **URL**: `http://localhost:3000/stores/nearby?cep=<CEP>`
- **Exemplo**:
  ```bash
  http://localhost:3000/stores/nearby?cep=50030170
  ```

### Resposta

A API retorna um JSON com as lojas próximas ao CEP fornecido. Exemplo:

```json
{
  "cep": "50030-170",
  "nearbyStores": [
    {
      "name": "DuduStore Recife Antigo",
      "address": "Rua do Bom Jesus, 123 - Recife/PE",
      "distance": "0.5 km"
    },
    {
      "name": "DuduStore Casa Forte",
      "address": "Rua do Riachuelo, 789 - Recife/PE",
      "distance": "5.7 km"
    }
  ]
}
```

---

## Dependências Principais

### Dependências de Produção

- **sqlite3**: Driver para conectar e interagir com o banco de dados SQLite.
- **typeorm**: ORM (Object-Relational Mapping) para gerenciar o banco de dados.
- **reflect-metadata**: Biblioteca necessária para o TypeORM funcionar corretamente com decorators.
- **axios**: Cliente HTTP para consumir a API do ViaCEP.
- **winston**: Biblioteca para geração de logs.
- **inquirer**: Biblioteca para criar interfaces de terminal interativas.

### Dependências de Desenvolvimento

- **typescript**: Compilador TypeScript.
- **ts-node**: Executa arquivos TypeScript diretamente.
- **@types/node**: Tipos TypeScript para o Node.js.
- **@types/inquirer**: Tipos TypeScript para o Inquirer.

---
