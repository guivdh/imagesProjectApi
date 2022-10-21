import 'reflect-metadata';

export const MAPPING_PROPERTIES_METADATA_KEY = 'mapping_properties';

export const DTOMapping = Mapping;

export const ViewMapping = Mapping;

export interface MappingOptions {
  property?: string;
  value?: (value: any) => any;
  datetime?: boolean;
  dtoOrEntity?: Function;
  groups?: string[];
}

function Mapping<T>(options?: MappingOptions) {
  return (target: any, objectPropertyKey: string) => {
    // Slice => copy array, NOT reference for the class inheritance
    const properties = (Reflect.getMetadata(MAPPING_PROPERTIES_METADATA_KEY, target) || []).slice();
    properties.push({
      object: (options) ? options.dtoOrEntity : null,
      entityProperty: (options && options.property) ? options.property : objectPropertyKey,
      customValue: (options && options.value) ? options.value : null,
      objectProperty: objectPropertyKey,
      groups: (options) ? options.groups : null,
      datetime: (options) ? options.datetime : false,
    });
    Reflect.defineMetadata(MAPPING_PROPERTIES_METADATA_KEY, properties, target);
  };
}
