
import * as argon2 from "argon2"
import { HashInterface } from "./hash.interface";
import { InternalServerErrorException } from "@nestjs/common";


export class Argon2iProvider implements HashInterface{

  private readonly  options = {
    type : argon2.argon2i, //specify using argon2id
    memoryCost: 2 **16, // Memory usage 64MB
    timeCost: 4, // Number of iterations
    parallelism: 1 , //single-thread for simplicity but can be adjusted
  }

  /**
   * Hash the password using Argon2id
   * @param data - The plain text password or buffer to hash
   * @returns - The hashed password with embedded parameters for verification
   */
  public async hashPassword(data:string | Buffer): Promise<string> {
    try{
      return await argon2.hash(data, this.options)
    } catch (error){
      const errorMessage = error.message || error;
      throw new InternalServerErrorException(`Argon Failed to hash password ${errorMessage}`);
    }
  }


  public async comparePassword(data:string | Buffer, encrypted:string): Promise<boolean> {
    try{
      return await argon2.verify(encrypted,data)
    }catch(error){
      const errorMessage = error.message || error;
      throw new InternalServerErrorException(`Argon Failed to hash password ${errorMessage}`)
    }
  }
}
