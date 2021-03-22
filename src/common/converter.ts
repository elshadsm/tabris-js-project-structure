import { Model } from '@models/index';

export function capitalize(value: string): string {
  if (typeof value !== 'string' || !value.length) {
    return '';
  }
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function arrayToString<T extends Model>(array: T[]): string {
  if (!array) {
    return '';
  }
  if (!array.length) {
    return '[]';
  }
  let string = '[';
  array.forEach((item, index) => {
    string += JSON.stringify(item.toJSON());
    if (index !== (array.length - 1)) {
      string += ',';
    }
  });
  return `${string}]`;
}
