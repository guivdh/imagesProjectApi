import { ValidationError } from 'class-validator';
import { DateTime } from 'luxon';
import { FindManyOptions, FindOneOptions, Not } from 'typeorm';
import { RepositoryService } from '../services/repository.service';
import { ValidationMessage } from './validation-messages';
import { ValidationHelper } from './validation.helper';

export class DTOValidator {

  private errors: ValidationError[];

  constructor(
    private dto?: any,
  ) {
    this.errors = [];
  }

  get length(): number {
    return this.errors.length;
  }

  updateDTO(dto: any): DTOValidator {
    this.dto = dto;

    return this;
  }

  getErrors(): ValidationError[] {
    return this.errors;
  }

  addError(property: string, message: string): DTOValidator {
    ValidationHelper.addError(this.errors, property, message);

    return this;
  }

  checkUnique(property: string, entity: any, customMessage?: string): DTOValidator {
    if (entity !== null && entity !== undefined) {
      ValidationHelper.addError(
        this.errors,
        property,
        (customMessage) ? customMessage : ValidationMessage.UNIQUE,
      );
    }

    return this;
  }

  checkFound(property: string, entity: any, customMessage?: string): DTOValidator {
    if (entity === null || entity === undefined) {
      ValidationHelper.addError(
        this.errors,
        property,
        (customMessage) ? customMessage : ValidationMessage.ENTITY_NOT_FOUND,
      );
    }

    return this;
  }

  checkDates(startDateProperty: string, endDateProperty: string, customMessage?: string): DTOValidator {
    if (!this.dto[endDateProperty]) {
      return;
    }

    const startDate = DateTime.fromJSDate(this.dto[startDateProperty]);
    const endDate = DateTime.fromJSDate(this.dto[endDateProperty]);

    if (startDate.toMillis() > endDate.toMillis()) {
      ValidationHelper.addError(
        this.errors,
        startDateProperty,
        (customMessage) ? customMessage : ValidationMessage.DATE_START_GREATER_THAN_END,
      );
    }

    return this;
  }

  async checkLinkedEntity(property: string, service: RepositoryService<any>, required?: boolean, customMessage?: string, options?: FindOneOptions): Promise<any> {
    const entity = await service.findOneById(this.dto[property], options);

    if (required && !entity) {
      ValidationHelper.addError(
        this.errors,
        property,
        (customMessage) ? customMessage : ValidationMessage.ENTITY_NOT_FOUND,
      );

      return null;
    }

    return entity;
  }


  async checkUniqueConstraint(property: string, service: RepositoryService<any>, properties: any, id?: number, customMessage?: string): Promise<DTOValidator> {
    if (!Array.isArray(properties)) {
      properties = [properties];
    }
    const options: FindManyOptions = { where: {} };

    for (const prop of properties) {
      options.where[prop] = this.dto[prop];
    }

    if (id) {
      options.where['id'] = Not(id);
    }
    if ((await service.count(options)) !== 0) {
      ValidationHelper.addError(
        this.errors,
        property,
        (customMessage) ? customMessage : ValidationMessage.USED_VALUE,
      );
    }

    return this;
  }

  checkBelgiumIBAN(property: string): DTOValidator {
    if (!this.dto[property]) {
      ValidationHelper.addError(this.errors, property, ValidationMessage.REQUIRED);
      return;
    }
    // = Step 1: Clean IBAN
    let iban: string = this.dto[property].replace(/[\s\-_/]+/g, '');
    // = Step 2: Move the four initial characters to the end of the string
    iban = iban.substr(4) + iban.substr(0, 4);
    // = Step 3: Replace each letter in the string with two digits, thereby expanding the string, where A = 10, B = 11, ..., Z = 35
    iban = iban.replace('BE', '1114');
    // = Optional (number too long): Split in two
    const part1 = iban.substr(0, iban.length / 2);
    const part2 = iban.substr(iban.length / 2);
    // = Step 4: Modulo 97 = 1
    const rest = parseInt((parseInt(part1, 10) % 97) + part2, 10) % 97;
    if (rest !== 1) {
      ValidationHelper.addError(this.errors, property, ValidationMessage.IBAN);
    }

    return this;
  }

  validate(httpException = true): DTOValidator {
    ValidationHelper.throwErrors(this.errors, httpException);

    return this;
  }
}
