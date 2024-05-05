import { AxiosPromise, AxiosRequestConfig } from './interface';
import xhr from './xhr';
import { buildURL } from './utils/url';
import { transformRequest } from './utils/data';
import { processHeader } from './utils/header';

function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config;
  return buildURL(url, params);
}

function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data);
}

function transformHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config;
  return processHeader(headers, data);
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config);
  config.headers = transformHeaders(config);
  config.data = transformRequestData(config);
}

function axios(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config);
  return xhr(config);
}

export default axios;
