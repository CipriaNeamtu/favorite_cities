import "reflect-metadata"
import { DataSource } from "typeorm"
import { UserEntity, SessionEntity, AccountEntity, VerificationTokenEntity } from "./entity/Users"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: false,
    entities: [UserEntity, SessionEntity, AccountEntity, VerificationTokenEntity],
    migrations: [],
    subscribers: [],
})