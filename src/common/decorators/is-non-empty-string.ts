import { registerDecorator, validateSync, ValidationArguments, ValidationOptions } from "class-validator";

export function IsNonEmptyString(validOption?: ValidationOptions){
  return function(object:object, propertyName:string){
    return registerDecorator({
      target: object.constructor,
      propertyName:propertyName,
      options:validOption,
      constraints:[],
      validator:{
        validate(args:unknown){
          return typeof args === "string" && args.trim().length > 0;
        },
        defaultMessage(value?: ValidationArguments): string {
          return `${value.property} must be a non-empty string. Provided value: "${value.value}"`;
        }

      }
    })
  }
}

export function IsPositiveInt(validOption?: ValidationOptions){
  return function(object:object, propertyName:string){
    return registerDecorator({
      target: object.constructor,
      propertyName:propertyName,
      options:validOption,
      constraints:[],
      validator:{
        validate(args:unknown){
          return typeof args === "number" && args > 0;
        },
        defaultMessage(value?: ValidationArguments): string {
          return `${value.property} must be a Positive Int. Provided value: "${value.value}"`;
        }

      }
    })
  }
}

