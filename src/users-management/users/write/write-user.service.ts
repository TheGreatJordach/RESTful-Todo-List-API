import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entity/user-entity";
import { Repository } from "typeorm";
import { UpdateUserDto } from "../dtos/update-user.dto";
import { CreateUserDto } from "../dtos/create-user.dto";

@Injectable()
export class WriteUserService {

  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  /**
   * Methode take the only responsibility to save new user. If something happen we know precisely
   * where and why
   *
   * @param createUserDto - The data object containing information to create a new user.
   * @returns A Promise that resolves with the created user data if successful.
   * @throws InternalServerErrorException if an error occurs during the database operation.
   */
  async create(createUserDto: CreateUserDto) {
    try{
      return await this.userRepository.save(createUserDto);
    } catch(error){
      //The HTTP response status code will be 500.
      throw new InternalServerErrorException(
        `Failed to create new user.
      An error occurred when trying to contact the database ${ error.detail}`);
    }

  }

  update(identifier:number, createUserDto: UpdateUserDto) {

    return `this Service update user ID ${identifier} with body ${JSON.stringify(createUserDto)}`;
  }

  remove(identifier:number) {
    return `this Service remove user ID ${identifier}`;
  }

}
