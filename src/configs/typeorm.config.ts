import { TypeOrmModuleOptions } from "@nestjs/typeorm"
import { User } from "src/auth/user.entity"
import { Board } from "src/boards/board.entitiy"
import * as config from 'config'

const dbConfig = config.get('db')

export const typeORMConfig: TypeOrmModuleOptions = {
    type: dbConfig.type,
    host: process.env.RDS_HOSTNAME || dbConfig.host,
    port: process.env.RDS_PORT || dbConfig.port,
    username: process.env.RDS_USERNAME || dbConfig.username,
    password: process.env.RDS_PASSWORD || dbConfig.password,
    database: process.env.RDS_DATABASE || dbConfig.database,
    // autoLoadEntities: true,
    entities: [Board, User],
    synchronize: dbConfig.synchronize,
    logging: true
}