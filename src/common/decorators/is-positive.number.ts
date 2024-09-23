import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";

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
