import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Store {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    street: string;

    @Column()
    number: string;

    @Column()
    city: string;

    @Column()
    state: string;

    @Column()
    cep: string;

    @Column("float")
    latitude: number;

    @Column("float")
    longitude: number;
}