import { Module } from '@nestjs/common';
import { UserModule } from "./users/userModule";
import { AuthModule } from "./auth/auth.module";
import { UserRegistrationController } from "./registration/user-registration.controller";
import { UserRegistrationService } from "./registration/user-registration.service";

@Module({
 controllers: [UserRegistrationController],
 providers: [UserRegistrationService],
 imports: [UserModule, AuthModule],
})
export class UsersManagementModule {}
