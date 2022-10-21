import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';
import { ValidationMessage } from '../validation-messages';

export function IsValidDate(validationOptions?: ValidationOptions) {
  return (object: Object, propertyName: string) => {

    if (!validationOptions) {
      validationOptions = {};
    }

    if (!validationOptions.message) {
      validationOptions.message = ValidationMessage.DATE;
    }

    registerDecorator({
      name: 'isValidDate',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate: (value: any, args: ValidationArguments) => {
          if (!value) {
            return false;
          }
          if (!(value instanceof Date)) {
            value = new Date(value);
          }
          return value.toString() !== 'Invalid Date';
        },
      },
    });
  };
}
