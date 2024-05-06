import { AxiosRequestConfig, AxiosResponse } from '../interface';
import dispatchRequest from './dispatchRequest';

export default class Axios {
  request(config: AxiosRequestConfig): Promise<AxiosResponse> {
    return dispatchRequest(config);
  }
  get(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.requestMethodWithoutData('get', url, config);
  }

  delete(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.requestMethodWithoutData('delete', url, config);
  }

  head(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.requestMethodWithoutData('head', url, config);
  }

  options(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.requestMethodWithoutData('options', url, config);
  }

  private requestMethodWithoutData(
    method: string,
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse> {
    return this.request({ ...config, url, method });
  }

  post(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse> {
    return this.requestMethodWithData('post', url, data, config);
  }

  put(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse> {
    return this.requestMethodWithData('put', url, data, config);
  }

  patch(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse> {
    return this.requestMethodWithData('patch', url, data, config);
  }

  private requestMethodWithData(
    method: string,
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse> {
    return this.request({ ...config, url, method, data });
  }
}
