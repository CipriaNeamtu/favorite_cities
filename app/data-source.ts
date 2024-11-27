import "reflect-metadata"
import { DataSource } from "typeorm"
import { UserEntity, SessionEntity, AccountEntity, VerificationTokenEntity } from "./entity/Users"
import { FavoriteCities } from "./entity/FavoriteCities"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: false,
    entities: [UserEntity, SessionEntity, AccountEntity, VerificationTokenEntity, FavoriteCities],
    migrations: [],
    subscribers: [],
})