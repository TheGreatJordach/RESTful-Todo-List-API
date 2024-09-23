import { Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "../../users/dtos/create-user.dto";

@Controller("/register")
export class AuthRegistrationController {


  @Post("")
  register(createUserDto: CreateUserDto) {}
}
