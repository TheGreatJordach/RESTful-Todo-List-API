import { Module } from "@nestjs/common";
import { WriteUserService } from "./write/write-user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entity/user-entity";
import { WriteUserController } from "./write/write-user.controller";

@Module({
  providers:[WriteUserService],
  imports:[TypeOrmModule.forFeature([User])],
  controllers:[WriteUserController]
})
export class UsersModule{}
