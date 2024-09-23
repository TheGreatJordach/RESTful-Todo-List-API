import { Module } from '@nestjs/common';
import { AuthenticationService } from "./auth.service";




@Module({
  imports: [],
  providers: [AuthenticationService],
  exports: [AuthenticationService],
})
export class AuthModule {}
