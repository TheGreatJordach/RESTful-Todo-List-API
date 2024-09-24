import { Body, Controller, Logger, Post } from "@nestjs/common";
import { CreateUserDto } from "../users/dtos/create-user.dto";
import { UserRegistrationService } from "./user-registration.service";
import { LoginUserDto } from "../users/dtos/login-user.dto";

@Controller("")
export class UserRegistrationController {
  private readonly logger = new Logger(UserRegistrationController.name);
  constructor(private readonly userRegistrationService: UserRegistrationService) {
  }

  @Post("/register")
  register(@Body() createUserDto: CreateUserDto) {
    this.logger.debug(`Received registration data: ${JSON.stringify(createUserDto)}`);
    return this.userRegistrationService.signUp(createUserDto)
  }

  @Post("/login")
  login(@Body() loginUserDto: LoginUserDto) {
    this.logger.debug(`Received registration data: ${JSON.stringify(loginUserDto)}`);
    return this.userRegistrationService.signIn(loginUserDto)
  }
}
