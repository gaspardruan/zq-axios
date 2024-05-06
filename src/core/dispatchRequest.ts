import { AxiosRequestConfig, AxiosResponse } from '../interface';
import xhr from './xhr';
import { buildURL } from '../utils/url';
import { transformRequest, transformResponse } from '../utils/data';
import { processHeader } from '../utils/header';

function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config;
  return buildURL(url!, params);
}

function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data);
}

function transformHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config;
  return processHeader(headers, data);
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data);
  return res;
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config);
  config.headers = transformHeaders(config);
  config.data = transformRequestData(config);
}

export default async function dispatchRequest(
  config: AxiosRequestConfig,
): Promise<AxiosResponse> {
  processConfig(config);
  return xhr(config).then((res) => {
    return transformResponseData(res);
  });
}
