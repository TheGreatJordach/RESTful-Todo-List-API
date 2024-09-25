import { Injectable, InternalServerErrorException, Logger, UnauthorizedException } from "@nestjs/common";
import { CreateUserDto } from "../users/dtos/create-user.dto";
import { WriteUserService } from "../users/write/write-user.service";
import { AuthenticationService } from "../auth/auth.service";
import { ReadUserService } from "../users/read/read-user.service";
import { User } from "../users/entity/user-entity";
import { LoginUserDto } from "../users/dtos/login-user.dto";
import { PasswordService } from "../auth/password/password.service";


@Injectable()
export class UserRegistrationService {

  constructor(

    private readonly writeUserService:WriteUserService,
    private readonly authUserService:AuthenticationService,
    private readonly readUserService: ReadUserService,
    private readonly passwordService: PasswordService,) {
  }

  async signUp(createUserDto: CreateUserDto):Promise<User> {
    /*** @Transactional Integrity require to ensure atomicity,
     ***especially if multiple database operations are involved in the signup process.**/

      //STEP-1: ask for the check if the email already
    const isEmailUsed: boolean = await this.isEmailAlreadyUsed(createUserDto.email)
    if (isEmailUsed) {
      throw new UnauthorizedException("Email already exists")
    }

    //Hash the userPassword
    const userPassword:string = createUserDto.password
    const hashedPassword:string = await this.passwordService.hashedPassword(userPassword)
    //STEP-2: ask for the creation of a new user
   const newUser: User = await this.writeUserService.create({ ...createUserDto, password: hashedPassword })

    //STEP-3: ultimate check Because of concurrent possible operation
    if(!newUser){
      throw new InternalServerErrorException("Failed to create new user, please try again")
    }

    return newUser;
  }
   private readonly logger = new Logger(UserRegistrationService.name)

  async isEmailAlreadyUsed(email: string): Promise<boolean> {
   return await this.readUserService.findEmail(email)


  }

  async signIn(loginUserDto:LoginUserDto){
    const {email, password} = loginUserDto;

    //STEP-1: ask for the check if the email already
    const isEmailUsed: boolean = await this.isEmailAlreadyUsed(email)
    if (isEmailUsed) {
      throw new UnauthorizedException("Email already exists")
    }

    //has the Password


    this.logger.debug(`Received login data: ${JSON.stringify(loginUserDto)}`);
    return `this service login a User with email ${ email } ans password${password}`;
  }

}
