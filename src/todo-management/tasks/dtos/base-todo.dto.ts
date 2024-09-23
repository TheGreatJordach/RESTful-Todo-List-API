import { Status, TodoInterface } from "./todo-interface";
import { User } from "../../../users-management/users/entity/user-entity";
import { VersionTask } from "@versions/entity/version-entity";
import { IsNonEmptyString } from "@common/decorators/is-non-empty-string";
import { IsBoolean, IsDate, IsEnum, IsOptional, ValidateNested } from "class-validator";
import { Transform, Type } from "class-transformer";

export class BaseTodoDto implements TodoInterface{
  @IsNonEmptyString()
  readonly description: string;
  @IsNonEmptyString()
  readonly title: string;
  @Type(()=> User)
  @ValidateNested()
 readonly user: User;
  @Type(()=> VersionTask)
  @ValidateNested({each:true})
  readonly versions: VersionTask[];

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => (value === undefined ? false : value))
  readonly priority?: boolean = false; // Default value set to false

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  @Transform(({ value }) => (value === undefined ? new Date() : value))
 readonly dueDate?: Date = new Date(); // Default value set to current date

  @IsOptional()
  @IsEnum(Status)
  @Transform(({ value }) => (value === undefined ? Status.NOT_STARTED : value))
  readonly status?: Status = Status.NOT_STARTED; // Default value set to NOT_STARTED
}
