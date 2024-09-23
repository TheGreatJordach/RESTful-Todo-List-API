import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthRegistrationService {

  signup(email: string, password: string) {

    return `This create a new user with email:${email} and password: ${password}`
  }
}
