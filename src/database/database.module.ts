import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ValidationConfig } from "../configuration/app-config/env/validate-env.variables";
import { TypeOrmModule } from "@nestjs/typeorm";
import { databaseConfig, DataSourceFactoryConfig } from "../configuration/app-config/db/database-config";

@Module({
  imports:[ConfigModule.forRoot({ validate: ValidationConfig }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: databaseConfig,
    dataSourceFactory:DataSourceFactoryConfig
  })
  ],
})
export class DatabaseModule {}
