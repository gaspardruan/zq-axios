/* eslint-disable no-prototype-builtins */
/* eslint-disable guard-for-in */
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

export function isFormData(val: any): val is FormData {
  return typeof FormData !== 'undefined' && val instanceof FormData;
}

export function isURLSearchParams(val: any): val is URLSearchParams {
  return (
    typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams
  );
}

export function extend<T, U>(to: T, from: U): T & U {
  // eslint-disable-next-line guard-for-in
  for (const key in from) {
    (to as T & U)[key] = from[key] as any;
  }
  return to as T & U;
}

export function extendMethod<T, U>(to: T, from: U): T & U {
  // eslint-disable-next-line guard-for-in
  const prototype = Object.getPrototypeOf(from);
  for (const key of Object.getOwnPropertyNames(prototype)) {
    if (key !== 'constructor') {
      (to as any)[key] = (from as any)[key];
    }
  }
  return to as T & U;
}

export function deepMerge(...objs: any[]): any {
  const result = Object.create(null);

  objs.forEach((obj) => {
    if (obj) {
      Object.keys(obj).forEach((key) => {
        const val = obj[key];
        if (isPlainObject(val)) {
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val);
          } else {
            result[key] = deepMerge(val);
          }
        } else {
          result[key] = val;
        }
      });
    }
  });

  return result;
}
