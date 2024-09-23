import { Body, Controller, Delete, Param, Patch } from "@nestjs/common";
import { WriteUserService } from "./write-user.service";
import { UpdateUserDto } from "../dtos/update-user.dto";
import { IdDto } from "@common/id-dto";

@Controller("/write/user")
export class WriteUserController {
  constructor(private readonly writeUserService: WriteUserService) {}

  @Patch(":id")
  updateUser(@Param() { id }:IdDto, @Body() updateUserDto: UpdateUserDto) {
    console.log(typeof id);
    return this.writeUserService.update(+id,updateUserDto);
  }

  @Delete(":id")
  deleteUser(@Param() { id }:IdDto) {
    return this.writeUserService.remove(+id)
  }
}
