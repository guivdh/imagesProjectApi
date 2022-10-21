import { Type } from '@nestjs/common';
import { ClassType } from 'class-transformer/ClassTransformer';
import 'reflect-metadata';
import { ObjectType } from 'typeorm';
import { MAPPING_PROPERTIES_METADATA_KEY } from '../decorators/mapping.decorator';
import { DateHelper } from '../helpers/date.helper';

export abstract class BaseEntity {
  static viewToEntities<T extends BaseEntity>(this: ObjectType<T>, dataList: any[], view: any): T[] {
    const properties = Reflect.getMetadata(MAPPING_PROPERTIES_METADATA_KEY, new view()) || [];
    const entities: T[] = [];
    for (const data of dataList) {
      const newEntity = (this as any).create();

      for (const item of properties) {
        BaseEntity._createProperty(newEntity, item.entityProperty, data[item.objectProperty], item.object);
      }

      entities.push(newEntity);
    }
    return entities;
  }

  static toDTOList<T>(entities: BaseEntity[], dto: Type<T>, groups?: string | string[]): T[] {
    const dtoList: T[] = [];
    for (const entity of entities) {
      dtoList.push(entity.toDTO(dto, groups));
    }
    return dtoList;
  }

  private static _createProperty(object: any, property: string, value: any, newObjectType: any) {
    if (!value) {
      return null;
    }

    const properties = property.split('.');
    let currentObject = object;
    for (let i = 0; i < properties.length; i++) {
      const prop = properties[i];
      if (!currentObject.hasOwnProperty(prop)) {
        currentObject[prop] = {};
        if (newObjectType) {
          currentObject[prop] = new newObjectType();
        }
      }
      if (i + 1 === properties.length) {
        currentObject[prop] = value;
      }
      currentObject = currentObject[prop];
    }
    return object;
  }

  /**
   * Convert the entity according to the DTO and the mapping
   */
  toDTO<T>(dto: ClassType<T>, groups?: string | string[]): T {
    const properties = Reflect.getMetadata(MAPPING_PROPERTIES_METADATA_KEY, new dto()) || [];
    const newDTO: T = new dto();
    for (const item of properties) {
      if (groups && !item.groups
        || typeof groups === 'string' && !item.groups.includes(groups)) {
        continue;
      } else if (Array.isArray(groups) && groups.length) {
        let groupFound = false;
        let i = 0;
        while (i < groups.length && !groupFound) {
          if (item.groups.includes(groups[i])) {
            groupFound = true;
          }
          i++;
        }
        if (!groupFound) {
          continue;
        }
      }

      newDTO[item.objectProperty] = null;
      if (item.object && this[item.entityProperty]) {
        newDTO[item.objectProperty] = BaseEntity._getDTOValue(this[item.entityProperty], item, groups);
      } else {
        newDTO[item.objectProperty] = BaseEntity._getDTOValue(
          this._getPropertyValue(this, item.entityProperty),
          item,
          groups,
        );
      }
    }
    return newDTO;
  }

  private static _getDTOValue(value: any, metadata: any, groups: string | string[]) {
    if (value instanceof Date) {
      if (metadata.hasOwnProperty('datetime') && metadata.datetime) {
        return DateHelper.dateToISO(value, true);
      } else {
        return DateHelper.dateToISO(value);
      }
    }

    if (value === null || value === undefined) {
      return null;
    }

    if (!metadata.object && !metadata.customValue) {
      if (Array.isArray(value) && value.length === 0) {
        return null;
      }
      return value;
    }
    // Custom Value
    if (metadata.customValue) {
      return metadata.customValue(value);
    }

    // Array
    if (Array.isArray(value)) {
      return BaseEntity.toDTOList(value, metadata.object, groups);
    }
    // object
    return value.toDTO(metadata.object, groups);
  }

  private _getPropertyValue(value: any, property: string) {
    const properties = property.split('.');
    for (const prop of properties) {
      if (Array.isArray(value)) {
        const array = [];
        for (const item of value) {
          array.push(this._getPropertyValue(item, prop));
        }
        return array;
      }
      if (value[prop] === null || value[prop] === undefined) {
        return null;
      }
      value = value[prop];
    }
    return value;
  }
}
