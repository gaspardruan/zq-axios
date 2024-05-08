import { AxiosRequestConfig, AxiosResponse } from '../interface';
import xhr from './xhr';
import { buildURL } from '../utils/url';
import { flattenHeaders } from '../utils/header';
import transform from './transform';

function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config;
  return buildURL(url!, params);
}

// function transformRequestData(config: AxiosRequestConfig): any {
//   return transformRequest(config.data);
// }

// function transformHeaders(config: AxiosRequestConfig): any {
//   const { headers = {}, data } = config;
//   return processHeader(headers, data);
// }

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transform(res.data, res.headers, res.config.transformResponse);
  return res;
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config);
  config.data = transform(config.data, config.headers, config.transformRequest);
  config.headers = flattenHeaders(config.headers, config.method!);
}

function throwIfCancellationRequested(config: AxiosRequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

export default async function dispatchRequest(
  config: AxiosRequestConfig,
): Promise<AxiosResponse> {
  throwIfCancellationRequested(config);
  processConfig(config);
  return xhr(config).then((res) => {
    return transformResponseData(res);
  });
}
