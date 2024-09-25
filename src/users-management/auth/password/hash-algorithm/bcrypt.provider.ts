import { HashInterface } from "./hash.interface";
import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptProvider implements HashInterface {

    constructor(private readonly configService: ConfigService) {
    }

    // *** is validated in src/configuration/app-config/env/validate-env.variables.ts
    private readonly salRounds:number = this.configService.get<number>("HASH_SALT_ROUND")


    /**
     * Asynchronously generates a salt using the configured number of rounds and then hashes the provided data using bcrypt.
     *
     * @param data - The data to be hashed, can be a string or a Buffer.
     * @returns A Promise that resolves to the hashed password as a string.
     * @throws InternalServerErrorException if an error occurs during the hashing process.
     */
    public async hashPassword(data:string | Buffer): Promise<string> {
        try{
            const salt:string = await bcrypt.genSalt(this.salRounds);
            return await bcrypt.hash(data,salt)
        } catch (error){
            throw new InternalServerErrorException(`Failed to hash password ${error}`);
        }
    }


    /**
     * Compares the provided data with the encrypted password using bcrypt for validation.
     *
     * @param data - The data to compare, can be a string or a Buffer.
     * @param encrypted - The encrypted password to compare against.
     * @returns A Promise that resolves to true if the data matches the encrypted password, false otherwise.
     * @throws InternalServerErrorException if an error occurs during the comparison process.
     */
    public async comparePassword(data:string | Buffer, encrypted:string): Promise<boolean> {
        try{
            return await bcrypt.compare(data,encrypted)
        } catch (error){
            throw new InternalServerErrorException(`Failed !. Something happen when trying to  to compare password ${error.toString()}`);
        }
    }

}
