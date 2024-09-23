import { PartialType } from "@nestjs/mapped-types";
import { CreateVersionDto } from "@versions/dtos/create-version.dto";

export class UpdateVersionDto extends PartialType(CreateVersionDto) {}
