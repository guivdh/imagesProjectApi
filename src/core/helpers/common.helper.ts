export class CommonHelper {
  static copyObject(obj: any) {
    if (typeof obj !== 'object') {
      return null;
    }
    return Object.assign({}, obj);
  }

  static mergeObjects(target: any, source: any) {
    // clone
    target = Object.assign({}, target);
    for (const propertyName in source) {
      if (!source.hasOwnProperty(propertyName)) {
        continue;
      }

      if (!Array.isArray(source[propertyName]) && isObject(source[propertyName]) && !isDate(source[propertyName])) {

        if (!target[propertyName] || !isObject(target[propertyName])) {
          target[propertyName] = {};
        }

        target[propertyName] = this.mergeObjects(target[propertyName], source[propertyName]);
        continue;
      }
      if (source[propertyName] !== undefined || source[propertyName] !== null) {
        target[propertyName] = source[propertyName];
      }
    }
    return target;
  }
}

export function isObject(object: any) {
  return object !== null && typeof object === 'object';
}

export function isDate(date: any) {
  return date instanceof Date;
}

export function isNotEmpty(value: any): boolean {
  if (Array.isArray(value)) {
    return value.length !== 0;
  }
  return value !== null && value !== undefined;
}

export function isEmpty(value: any): boolean {
  if (Array.isArray(value)) {
    return value.length === 0;
  }
  return value === null || value === undefined;
}