import { transformRequest, transformResponse } from '../../src/utils/data';

describe('utils: data', () => {
  describe('transformRequest', () => {
    test('should transform request data to string if data is a PlainObject', () => {
      const data = { a: 1 };
      expect(transformRequest(data)).toBe('{"a":1}');
    });

    test('should do nothing if data is not a PlainObject', () => {
      const data = new URLSearchParams('a=b');
      expect(transformRequest(data)).toBe(data);
    });
  });

  describe('transformResponse', () => {
    test('should transform response data to Object if data is a JSON string', () => {
      const data = '{"a": 1}';
      expect(transformResponse(data)).toEqual({ a: 1 });
    });

    test('should do nothing if data is a string but not a JSON string', () => {
      const data = '{ a: 1 }';
      expect(transformResponse(data)).toBe(data);
    });

    test('should do nothing if data is not a string', () => {
      const data = { a: 1 };
      expect(transformResponse(data)).toBe(data);
    });
  });
});
