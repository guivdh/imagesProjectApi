import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';
import { ValidationMessage } from '../validation-messages';

export function IsId(validationOptions?: ValidationOptions) {
  return (object: Object, propertyName: string) => {

    if (!validationOptions) {
      validationOptions = {};
    }

    if (!validationOptions.message) {
      validationOptions.message = ValidationMessage.IS_ID;
    }

    registerDecorator({
      name: 'isId',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate: (value: any, args: ValidationArguments) => {
          const id = parseInt(value, 10);

          return value !== null
            && value !== undefined // IsNotEmpty
            && !Number.isNaN(id) // IsNumber
            && id > 0; // IsPositive & Min(1)
        },
      },
    });
  };
}
