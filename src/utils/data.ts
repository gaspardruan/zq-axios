import { isPlainObject } from './util';

export function transformRequest(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data);
  }
  return data;
}

export function transformResponse(_data: any): any {
  let data = _data;
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data);
    } catch (e) {
      // do nothing
    }
  }
  return data;
}
