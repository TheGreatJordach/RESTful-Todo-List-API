import { PartialType } from "@nestjs/mapped-types";
import { BaseTodoDto } from "@tasks/dtos/base-todo.dto";

export class UpdateTodoDto extends PartialType(BaseTodoDto){}
