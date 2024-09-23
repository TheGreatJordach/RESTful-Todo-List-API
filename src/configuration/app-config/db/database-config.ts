import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { TodoTask } from "../../../todo-management/tasks/entity/todo-entity";
import { VersionTask } from "@versions/entity/version-entity";
import { User } from "../../../users-management/users/entity/user-entity";


export const databaseConfig = async (configService: ConfigService):Promise<TypeOrmModuleOptions> => ({
   type: "postgres",
   host: configService.getOrThrow<string>("DATASOURCE_HOST"),
   port: configService.getOrThrow<number>("DATASOURCE_PORT"),
   username: configService.getOrThrow<string>("DATASOURCE_USERNAME"),
   password: configService.getOrThrow<string>("DATASOURCE_PASSWORD"),
   database: configService.getOrThrow<string>("DATASOURCE_DATABASE"),
   synchronize: true,
   logging: false,
   entities:[User,TodoTask,VersionTask]
  }

  )


export const DataSourceFactoryConfig = async (options) => {
   if (!options) {
      throw new Error("DataSourceOption not provided");
   }
   const dataSource = new DataSource(options);
   await dataSource.initialize();
   return dataSource;
}
