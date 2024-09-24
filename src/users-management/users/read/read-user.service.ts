import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entity/user-entity";
import { Repository } from "typeorm";

@Injectable()
export class ReadUserService {

  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  findById(id: number) {
    return `this find a userID ${id} from UserService`
  }

  /**
   * Asynchronously checks if a user with the specified email exists in the database.
   * Counting does not load the Entity, the operation is faster
   *
   * @param email - The email address to search for in the database.
   * @returns A Promise that resolves to a boolean indicating whether the email exists in the database.
   */
  async findEmail(email: string): Promise<boolean> {
    try {
      const count: number = await this.userRepository.count({where: {email}});
      return count > 0;
    } catch (error){
      throw new InternalServerErrorException(
        ` An error occur when trying to connect to the database ${ error.message }`);
    }


  }
}
