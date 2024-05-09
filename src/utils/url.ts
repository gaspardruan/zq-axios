/* eslint-disable no-useless-escape */
import { isDate, isPlainObject, isURLSearchParams } from './util';

interface URLOrigin {
  protocol: string;
  host: string;
}

function encode(val: string | number | boolean): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']');
}

export function buildURL(
  _url: string,
  params?: any,
  paramsSerializer?: (params: any) => string,
): string {
  if (!params) {
    return _url;
  }

  let serializedParams;

  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    const parts: string[] = [];

    Object.keys(params).forEach((_key) => {
      let key = _key;
      const val = params[key];
      if (val === null || typeof val === 'undefined') {
        return;
      }

      let values = [];
      if (Array.isArray(val)) {
        values = val;
        key += '[]';
      } else {
        values = [val];
      }

      values.forEach((_v) => {
        let v: string | number | boolean;
        if (isDate(_v)) {
          v = _v.toISOString();
        } else if (isPlainObject(_v)) {
          v = JSON.stringify(_v);
        } else {
          v = _v;
        }
        parts.push(`${encode(key)}=${encode(v)}`);
      });
    });
    serializedParams = parts.join('&');
  }

  let url = _url;
  if (serializedParams) {
    const markIndex = url.indexOf('#');
    if (markIndex !== -1) {
      url = url.slice(0, markIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
}

export function isAbsoluteURL(url: string): boolean {
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
}

export function combineURL(baseURL: string, relativeURL?: string) {
  return relativeURL
    ? `${baseURL.replace(/\/+$/, '')}/${relativeURL.replace(/^\/+/, '')}`
    : baseURL;
}

const urlParsingNode = document.createElement('a');
const currentOrigin = resolveURL(window.location.href);

function resolveURL(url: string): URLOrigin {
  urlParsingNode.setAttribute('href', url);
  const { protocol, host } = urlParsingNode;
  return {
    protocol,
    host,
  };
}

export function isURLSameOrigin(requestURL: string): boolean {
  const parsedOrigin = resolveURL(requestURL);
  return (
    parsedOrigin.protocol === currentOrigin.protocol &&
    parsedOrigin.host === currentOrigin.host
  );
}
