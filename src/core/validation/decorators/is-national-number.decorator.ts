import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';
import { ValidationMessage } from '../validation-messages';

export function isNationalNumber(value: any) {
  const nationalNumber = value.toString().replace(/[./-]/g, '');
  if (nationalNumber.length !== 11) {
    return false;
  }
  const currentControlNumber = parseInt(nationalNumber.substr(9, 2), 10);
  let controlNumber = 97 - (parseInt(nationalNumber.substr(0, 9), 10) % 97);
  if (controlNumber === 0) {
    controlNumber = 97;
  }
  if (controlNumber !== currentControlNumber) {
    controlNumber = 97 - (parseInt('2' + nationalNumber.substr(0, 9), 10) % 97);
    if (controlNumber === 0) {
      controlNumber = 97;
    }
    return controlNumber === currentControlNumber;
  }
  return true;
}

export function IsNationalNumber(validationOptions?: ValidationOptions) {
  return (object: Object, propertyName: string) => {

    if (!validationOptions) {
      validationOptions = {};
    }

    if (!validationOptions.message) {
      validationOptions.message = ValidationMessage.NATIONAL_NUMBER;
    }

    registerDecorator({
      name: 'ssNationalNumber',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate: (value: any, args: ValidationArguments) => {
          return isNationalNumber(value);
        },
      },
    });
  };
}
