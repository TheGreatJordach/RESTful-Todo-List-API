import { TodoTask } from '@tasks/entity/todo-entity';

import { IsEmail, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { IsNonEmptyString } from "@common/decorators/is-non-empty-string";

export class BaseUserDto {
  @IsNonEmptyString()
  readonly name: string;
  @IsEmail({})
  readonly email: string;
  @Type(()=> TodoTask)
  @ValidateNested({each:true})
  readonly todos:TodoTask[]
}
