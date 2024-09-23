import { PartialType } from "@nestjs/mapped-types";
import { BaseUserDto } from "@users/dtos/base-user.dto";

export class UpdateUserDto extends PartialType(BaseUserDto){}
