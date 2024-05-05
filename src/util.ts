const { toString } = Object.prototype;

export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]';
}

export function isObject(val: any): val is Object {
  return val !== null && typeof val === 'object';
}