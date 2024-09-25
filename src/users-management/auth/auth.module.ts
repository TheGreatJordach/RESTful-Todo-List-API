import { Module } from '@nestjs/common';
import { AuthenticationService } from "./auth.service";
import { PasswordService } from "./password/password.service";
import { BcryptProvider } from "./password/hash-algorithm/bcrypt.provider";




@Module({
  imports: [],
  providers: [AuthenticationService,PasswordService,BcryptProvider],
  exports: [AuthenticationService,PasswordService],
})
export class AuthModule {}
