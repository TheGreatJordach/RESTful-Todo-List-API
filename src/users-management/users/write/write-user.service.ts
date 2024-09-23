import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entity/user-entity";
import { Repository } from "typeorm";
import { UpdateUserDto } from "../dtos/update-user.dto";
import { CreateUserDto } from "../dtos/create-user.dto";

@Injectable()
export class WriteUserService {

  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  create(createUserDto: CreateUserDto) {
    return `this Service user with body ${JSON.stringify(createUserDto)}`
  }

  update(identifier:number, createUserDto: UpdateUserDto) {

    return `this Service update user ID ${identifier} with body ${JSON.stringify(createUserDto)}`;
  }

  remove(identifier:number) {
    return `this Service remove user ID ${identifier}`;
  }

}
