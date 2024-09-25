import { Injectable } from "@nestjs/common";
import { BcryptProvider } from "./hash-algorithm/bcrypt.provider";

@Injectable()
export class PasswordService {

  constructor(private readonly bcryptProvider:BcryptProvider ) {}


  /**
   * Asynchronously hashes the provided password using bcrypt.
   *
   * @param password - The password to be hashed, can be a string.
   * @returns A Promise that resolves to the hashed password as a string.
   */
  async hashedPassword(password:string): Promise<string> {
    return await this.bcryptProvider.hashPassword(password)
  }

  /**
   * Compares the provided login password with the encrypted password using bcrypt for validation.
   *

   * @param loginPassword - The Login password to compare, can be a string or a Buffer.
   * @param encryptedPassword - The encrypted password to compare against.
   * @returns A Promise that resolves to true if the login password matches the encrypted password, false otherwise.
   * @throws InternalServerErrorException if an error occurs during the comparison process.
   */
  async comparePassword(loginPassword:string | Buffer,encryptedPassword:string): Promise<boolean> {
    return await this.bcryptProvider.comparePassword(loginPassword, encryptedPassword);
  }
}
