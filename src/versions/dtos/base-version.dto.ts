import { VersionInterface } from "@versions/dtos/version-interface";
import { TodoTask } from "../../todo-management/tasks/entity/todo-entity";
import { IsNonEmptyString } from "@common/decorators/is-non-empty-string";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, ValidateNested } from "class-validator";

export class BaseVersionDto implements VersionInterface{
  @IsNonEmptyString()
  readonly description: string;
  @IsNonEmptyString()
  readonly title: string;
  @Type(()=> TodoTask)
  @ValidateNested({each:true})
  readonly todoTask: TodoTask[];
  @IsNumber()
  @IsNotEmpty()
  readonly versionNumber: number;
}
