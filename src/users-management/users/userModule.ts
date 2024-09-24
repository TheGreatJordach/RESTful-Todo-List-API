import { Module } from "@nestjs/common";
import { WriteUserService } from "./write/write-user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entity/user-entity";
import { WriteUserController } from "./write/write-user.controller";
import { ReadUserService } from "./read/read-user.service";

@Module({
  providers:[WriteUserService,ReadUserService],
  imports:[TypeOrmModule.forFeature([User])],
  controllers:[WriteUserController],
  exports:[WriteUserService,ReadUserService]
})
export class UserModule {}
