import { IsNonEmptyString } from "@common/decorators/is-non-empty-string";
import { IsEmail, ValidateNested } from "class-validator";
import { TodoTask } from "../../../todo-management/tasks/entity/todo-entity";
import { Type } from "class-transformer";


export class BaseUserDto {
  @IsNonEmptyString()
  readonly name: string;
  @IsEmail({})
  readonly email: string;
  @Type(()=> TodoTask)
  @ValidateNested({each:true})
  readonly todos:TodoTask[]
}
