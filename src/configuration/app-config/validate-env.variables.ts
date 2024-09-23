import { plainToInstance } from "class-transformer";
import { validateSync } from "class-validator";
import { InternalServerErrorException } from "@nestjs/common";
import { IsNonEmptyString, IsPositiveInt } from "../../common/decorators/is-non-empty-string";


export class ValidateEnv {
  // **** database env
  @IsNonEmptyString()
  DATASOURCE_USERNAME:string
  @IsNonEmptyString()
  DATASOURCE_PASSWORD:string
  @IsNonEmptyString()
  DATASOURCE_DATABASE:string
  @IsNonEmptyString()
  DATASOURCE_HOST:string
  @IsPositiveInt()
  DATASOURCE_PORT:number

// **** app env
  @IsPositiveInt()
  APP_CACHE_TTL:number
  @IsPositiveInt()
  APP_CACHE_MAX:number
  @IsPositiveInt()
  APP_PORT:number
  @IsNonEmptyString()
  APP_PREFIX:string

  // **** swagger
  @IsNonEmptyString()
  SWAGGER_LICENCE_URL:string
  @IsNonEmptyString()
  SWAGGER_SERVER:string
  @IsNonEmptyString()
  SWAGGER_TITLE:string
  @IsNonEmptyString()
  SWAGGER_DESCRIPTION:string
  @IsNonEmptyString()
  SWAGGER_PATH:string
  @IsNonEmptyString()
  SWAGGER_VERSION:string
  @IsNonEmptyString()
  SWAGGER_LICENCE:string

}


export function ValidationConfig(config: Record<string, unknown>){

  const validatedConfig = plainToInstance(ValidateEnv, config, {
    enableImplicitConversion: true
  })

  const errors = validateSync(validatedConfig,{
    skipMissingProperties:false
  })

  if(errors.length > 0) {
    throw new InternalServerErrorException(`
    ${ errors.length } environment variables failed the validation step. 
    ${errors.toString()}`)}

  return validatedConfig
}
