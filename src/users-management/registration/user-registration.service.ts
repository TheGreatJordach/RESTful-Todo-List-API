import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "../users/dtos/create-user.dto";
import { WriteUserService } from "../users/write/write-user.service";
import { AuthenticationService } from "../auth/auth.service";

@Injectable()
export class UserRegistrationService {

  constructor(
    private readonly writeUserService:WriteUserService,
    private readonly authUserService:AuthenticationService) {
  }

  signup(createUserDto: CreateUserDto) {

    return `This is a call in the user registration service to create a new user with ${JSON.stringify(createUserDto)}`;
  }
}
