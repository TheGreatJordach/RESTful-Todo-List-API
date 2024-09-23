import { Module } from '@nestjs/common';
import { AuthRegistrationController } from "./registration/auth-registration.controller";
import { AuthRegistrationService } from "./registration/auth-registration.service";



@Module({
  controllers: [AuthRegistrationController, AuthRegistrationController],
  providers: [AuthRegistrationService],
  imports: []
})
export class AuthModule {}
