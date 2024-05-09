import {
  isDate,
  isPlainObject,
  isFormData,
  isURLSearchParams,
  extend,
  deepMerge,
} from '../../src/utils/util';

describe('utils:util', () => {
  describe('isXX', () => {
    test('should validate Date', () => {
      expect(isDate(new Date())).toBeTruthy();
      expect(isDate(Date.now())).toBeFalsy();
    });

    test('should validate PlainObject', () => {
      expect(isPlainObject({})).toBeTruthy();
      expect(isPlainObject(new Date())).toBeFalsy();
    });

    test('should validate FormData', () => {
      expect(isFormData(new FormData())).toBeTruthy();
      expect(isFormData({})).toBeFalsy();
    });

    test('should validate URLSearchParams', () => {
      expect(isURLSearchParams(new URLSearchParams())).toBeTruthy();
      expect(isURLSearchParams('foo=1&bar=2')).toBeFalsy();
    });
  });

  describe('extend', () => {
    test('should be mutable', () => {
      const a = Object.create(null);
      const b = { foo: 123 };

      extend(a, b);

      expect(a.foo).toBe(123);
    });

    test('should extend properties', () => {
      const a = { foo: 123, bar: 456 };
      const b = { bar: 789 };

      const res = extend(a, b);

      expect(res.foo).toBe(123);
      expect(res.bar).toBe(789);
    });
  });

  describe('deepMerge', () => {
    test('should be immutable', () => {
      const a = Object.create(null);
      const b = { foo: 123 };

      deepMerge(a, b);

      expect(a.foo).toBeUndefined();
    });

    test('should deepMerge properties', () => {
      const a = { foo: { bar: 123 } };
      const b = { foo: { baz: 456 }, bar: 789 };

      const res = deepMerge(a, b);

      expect(res.foo.bar).toBe(123);
      expect(res.foo.baz).toBe(456);
      expect(res.bar).toBe(789);
    });

    test('should deepMerge recursively', () => {
      const a = { foo: { bar: { baz: 123 } } };
      const b = { foo: { bar: { baz: 456 } } };

      const res = deepMerge(a, b);

      expect(res.foo.bar.baz).toBe(456);
    });

    test('should remove all references from nested objects', () => {
      const a = { foo: { bar: 123 } };
      const b = { foo: { bar: 456 } };

      const res = deepMerge(a, b);

      expect(res.foo).not.toBe(a.foo);
      expect(res.foo.bar).not.toBe(a.foo.bar);
    });

    test('should handle null and undefined arguments', () => {
      expect(deepMerge(undefined, undefined)).toEqual({});
      expect(deepMerge(undefined, { foo: 123 })).toEqual({ foo: 123 });
      expect(deepMerge({ foo: 123 }, undefined)).toEqual({ foo: 123 });
      expect(deepMerge(null, null)).toEqual({});
      expect(deepMerge(null, { foo: 123 })).toEqual({ foo: 123 });
      expect(deepMerge({ foo: 123 }, null)).toEqual({ foo: 123 });
    });
  });
});
