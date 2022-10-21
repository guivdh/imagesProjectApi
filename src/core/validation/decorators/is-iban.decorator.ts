import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';
import validator from 'validator';
import { ValidationMessage } from '../validation-messages';

export function IsIBAN(validationOptions?: ValidationOptions) {
  return (object: Object, propertyName: string) => {

    if (!validationOptions) {
      validationOptions = {};
    }

    if (!validationOptions.message) {
      validationOptions.message = ValidationMessage.IBAN;
    }

    registerDecorator({
      name: 'isIBAN',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate: (value: any, args: ValidationArguments) => typeof value === 'string' && validator.isIBAN(value),
      },
    });
  };
}
