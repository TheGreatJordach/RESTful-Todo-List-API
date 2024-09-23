import { IsInt, IsNotEmpty, IsPositive } from "class-validator";

export class IdDto {
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  readonly id: number;
}
