import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { TodoTask } from "./entity/todo-entity";

@Module({
  imports:[TypeOrmModule.forFeature([TodoTask])]
})
export class TasksModule {}
