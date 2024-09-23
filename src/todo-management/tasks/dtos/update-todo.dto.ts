import { PartialType } from "@nestjs/mapped-types";
import { BaseTodoDto } from "./base-todo.dto";

export class UpdateTodoDto extends PartialType(BaseTodoDto){}
