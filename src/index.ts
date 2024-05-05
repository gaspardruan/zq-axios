import { AxiosRequestConfig } from './interface';
import xhr from './xhr';
import { buildURL } from './url';

function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config;
  return buildURL(url, params);
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config);
}

function axios(config: AxiosRequestConfig) {
  processConfig(config);
  xhr(config);
}

export default axios;
