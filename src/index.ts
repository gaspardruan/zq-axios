import { AxiosRequestConfig } from './interface';
import xhr from './xhr';
import { buildURL } from './url';
import { transformRequest } from './data';

function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config;
  return buildURL(url, params);
}

function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data);
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config);
  config.data = transformRequestData(config);
}

function axios(config: AxiosRequestConfig) {
  processConfig(config);
  xhr(config);
}

export default axios;
