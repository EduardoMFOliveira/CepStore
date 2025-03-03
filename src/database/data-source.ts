import { DataSource } from "typeorm";
import { Store } from "./entities/Store";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite", // Nome do arquivo do banco de dados
    entities: [Store],
    synchronize: true, // Cria automaticamente as tabelas (apenas para desenvolvimento)
    logging: true,
});