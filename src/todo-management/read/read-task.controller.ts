import { Controller } from "@nestjs/common";
import { ReadTaskService } from "./read-task.service";

@Controller('read')
export class ReadTaskController {

  constructor(private readonly readTaskService: ReadTaskService) {}
}
