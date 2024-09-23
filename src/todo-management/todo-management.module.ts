import { Module } from '@nestjs/common';
import { ReadTaskService } from "./read/read-task.service";
import { ReadTaskController } from "./read/read-task.controller";
import { VersionsModule } from "@versions/versions.module";
import { TasksModule } from "./tasks/tasks.module";

@Module({
  providers:[ReadTaskService],
  controllers: [ReadTaskController],
  imports:[VersionsModule,TasksModule]
})
export class TodoManagementModule {}
