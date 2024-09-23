import { Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "../users/dtos/create-user.dto";
import { UserRegistrationService } from "./user-registration.service";

@Controller("/register")
export class UserRegistrationController {

  constructor(private readonly userRegistrationService: UserRegistrationService) {
  }

  @Post("")
  register(createUserDto: CreateUserDto) {
    return this.userRegistrationService.signup(createUserDto)
  }
}
