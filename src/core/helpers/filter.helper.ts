import { Brackets, SelectQueryBuilder } from 'typeorm';
import * as sd from 'soundex-code';

export class FilterHelper {

  static addBooleanFilter<T>(qb: SelectQueryBuilder<T>, alias: string, entityProperty: string, filter: boolean) {
    if (filter) {
      qb.andWhere(`${alias}.${entityProperty} = true`);
    } else if (filter !== undefined) {
      qb.andWhere(new Brackets((qbb) => {
        qbb.where(`${alias}.${entityProperty} IS NULL`)
          .orWhere(`${alias}.${entityProperty} = false`);
      }));
    }
  }

  /**
   * Filter: Equal
   *
   * property = value
   */
  static addEqualFilter<T>(qb: SelectQueryBuilder<T>, alias: string, entityProperty: string, value: any, transform?: string) {
    if (value) {
      const key = alias + entityProperty;
      const param = {};
      param[key] = value;
      if (transform) {
        qb.andWhere(`${transform}(${alias}.${entityProperty}) = ${transform}(:${key})`, param);
      } else {
        qb.andWhere(`${alias}.${entityProperty} = :${key}`, param);
      }
    }
  }

  /**
   * Filter: Not Equal
   *
   * property != value
   */
  static addNotEqualFilter<T>(qb: SelectQueryBuilder<T>, alias: string, entityProperty: string, value: any, transform?: string) {
    if (value) {
      const key = alias + entityProperty;
      const param = {};
      param[key] = value;
      if (transform) {
        qb.andWhere(`${transform}(${alias}.${entityProperty}) != ${transform}(:${key})`, param);
      } else {
        qb.andWhere(`${alias}.${entityProperty} != :${key}`, param);
      }
    }
  }

  /**
   * Filter: Equals
   *
   * property = value[0] OR property = value[1] OR ...
   */
  static addEqualsFilter<T>(qb: SelectQueryBuilder<T>, alias: string, entityProperty: string, value: any | any[]) {
    if (value === undefined || Array.isArray(value) && value.length === 0) {
      return;
    }
    const key = alias + entityProperty;
    const values = (Array.isArray(value)) ? value : [value];
    const param = {};
    param[key] = values;
    qb.andWhere(`${alias}.${entityProperty} IN (:...${key})`, param);
  }

  static addBetweenDateFilter<T>(qb: SelectQueryBuilder<T>, alias: string, entityProperty: string, startDate: Date, endDate: Date) {
    if (!startDate && !endDate) {
      return;
    }

    const param = {};
    const baseKey = alias + entityProperty;

    if (startDate && endDate) {
      const startKey = baseKey + 'start';
      const endKey = baseKey + 'end';
      param[startKey] = startDate;
      param[endKey] = endDate;
      qb.andWhere(`DATE(${alias}.${entityProperty}) BETWEEN DATE(:${startKey}) AND DATE(:${endKey})`, param);
    } else if (startDate) {
      param[baseKey] = startDate;
      qb.andWhere(`DATE(${alias}.${entityProperty}) >= DATE(:${baseKey})`, param);
    } else if (endDate) {
      param[baseKey] = endDate;
      qb.andWhere(`DATE(${alias}.${entityProperty}) <= DATE(:${baseKey})`, param);
    }
  }

  static addLikeFilter<T>(qb: SelectQueryBuilder<T>, alias: string, entityProperty: string, value: any) {
    if (value) {
      const key = alias + entityProperty;
      const param = {};
      param[key] = `%${value}%`;
      qb.andWhere(`UNACCENT(${alias}.${entityProperty}) ILIKE UNACCENT(:${key})`, param);
    }
  }

  static addLikePhoneticFilter<T>(qb: SelectQueryBuilder<T>, alias: string, entityProperty: string, phoneticProperty: string, value: any) {
    if (value) {
      const key = alias + entityProperty;
      const phoneticKey = alias + phoneticProperty;

      qb.andWhere(new Brackets((qbp) => {
        qbp.andWhere(`UNACCENT(${alias}.${entityProperty}) ILIKE UNACCENT(:${key})`)
          .orWhere(`${alias}.${phoneticProperty} ILIKE :${phoneticKey}`);
      }));
      qb.addOrderBy(`${alias}.${entityProperty} ILIKE :order${key}`, 'DESC');

      qb.setParameter(`order${key}`, `%${value}%`);
      qb.setParameter(key, `%${value}%`);
      qb.setParameter(phoneticKey, sd(value));
    }
  }
}
