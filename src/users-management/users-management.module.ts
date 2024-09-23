import { Module } from '@nestjs/common';
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { UserRegistrationController } from "./registration/user-registration.controller";
import { UserRegistrationService } from "./registration/user-registration.service";

@Module({
 controllers: [UserRegistrationController],
 providers: [UserRegistrationService],
 imports: [UsersModule, AuthModule],
})
export class UsersManagementModule {}
