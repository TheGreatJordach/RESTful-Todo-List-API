import { Module, ValidationPipe } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppConfigModule } from './configuration/app-config/app.config.module';
import { DatabaseModule } from './database/database.module';
import { TodoManagementModule } from './todo-management/todo-management.module';
import { UsersManagementModule } from './users-management/users-management.module';
import { AppService } from "./app.service";





@Module({
  imports: [AppConfigModule, DatabaseModule, TodoManagementModule, UsersManagementModule],
  controllers: [AppController],
  providers:[AppService]
})
export class AppModule {}
