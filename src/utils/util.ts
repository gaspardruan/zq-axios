const { toString } = Object.prototype;

export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]';
}

// export function isObject(val: any): val is Object {
//   return val !== null && typeof val === 'object';
// }

export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]';
}

export function extend<T, U>(to: T, from: U): T & U {
  // eslint-disable-next-line guard-for-in
  for (const key in from) {
    (to as T & U)[key] = from[key] as any;
  }
  return to as T & U;
}
