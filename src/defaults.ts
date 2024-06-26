/* eslint-disable func-names */
import { AxiosRequestConfig } from './interface';
import { processHeader } from './utils/header';
import { transformRequest, transformResponse } from './utils/data';

const defaults: AxiosRequestConfig = {
  method: 'get',
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*',
    },
  },

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  transformRequest: [
    function (data: any, headers: any): any {
      processHeader(headers, data);
      return transformRequest(data);
    },
  ],
  transformResponse: [
    function (data: any): any {
      return transformResponse(data);
    },
  ],

  validateStatus(status: number): boolean {
    return status >= 200 && status < 300;
  },
};

const methodsNoData = ['delete', 'get', 'head', 'options'];

methodsNoData.forEach((method) => {
  defaults.headers[method] = {};
});

const methodsWithData = ['post', 'put', 'patch'];

methodsWithData.forEach((method) => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
});

export default defaults;
