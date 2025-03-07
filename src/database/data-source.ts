import { DataSource } from "typeorm";
import { Store } from "./entities/Store";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    entities: [Store],
    synchronize: true,
    logging: true,
});
