import cookie from '../../src/utils/cookie';

describe('utils:cookie', () => {
  test('should read cookie', () => {
    document.cookie = 'foo=bar';
    expect(cookie.read('foo')).toBe('bar');
  });

  test('should return null if cookie name is not exist', () => {
    document.cookie = 'foo=bar';
    expect(cookie.read('baz')).toBeNull();
  });
});
