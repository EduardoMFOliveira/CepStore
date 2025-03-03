import { AppDataSource } from "./database/data-source";
import { Store } from "./database/entities/Store";

async function seedDatabase() {
    await AppDataSource.initialize();

    const storeData = [
        {
            name: "DuduStore Recife Antigo",
            street: "Rua do Bom Jesus",
            number: "123",
            city: "Recife",
            state: "PE",
            cep: "50030170",
            latitude: -8.0619,
            longitude: -34.8713
        },
        {
            name: "DuduStore Boa Viagem",
            street: "Avenida Boa Viagem",
            number: "456",
            city: "Recife",
            state: "PE",
            cep: "51021000",
            latitude: -8.1199,
            longitude: -34.9048
        },
        {
            name: "DuduStore Casa Forte",
            street: "Rua do Riachuelo",
            number: "789",
            city: "Recife",
            state: "PE",
            cep: "52061000",
            latitude: -8.0346,
            longitude: -34.9176
        }
    ];

    await AppDataSource.getRepository(Store).save(storeData);
    console.log("Lojas da DuduStore cadastradas com sucesso!");
    process.exit();
}

seedDatabase();