import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AppConfigModule } from './configuration/app-config/app.config.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { VersionsModule } from './versions/versions.module';


@Module({
  imports: [AppConfigModule, DatabaseModule, UsersModule, TasksModule, VersionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
