import { AxiosRequestConfig, AxiosResponse } from '../interface';
import dispatchRequest from './dispatchRequest';

export default class Axios {
  // request(config: AxiosRequestConfig): Promise<AxiosResponse> {
  //   return dispatchRequest(config);
  // }

  request<T = any>(url: any, _config?: any): Promise<AxiosResponse<T>> {
    let config = _config;
    if (typeof url === 'string') {
      if (!_config) {
        config = {};
      }
      config.url = url;
    } else {
      config = url;
    }
    return dispatchRequest(config);
  }

  get<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.requestMethodWithoutData<T>('get', url, config);
  }

  delete<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.requestMethodWithoutData<T>('delete', url, config);
  }

  head<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.requestMethodWithoutData<T>('head', url, config);
  }

  options<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.requestMethodWithoutData<T>('options', url, config);
  }

  private requestMethodWithoutData<T = any>(
    method: string,
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.request<T>({ ...config, url, method });
  }

  post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.requestMethodWithData<T>('post', url, data, config);
  }

  put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.requestMethodWithData<T>('put', url, data, config);
  }

  patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.requestMethodWithData<T>('patch', url, data, config);
  }

  private requestMethodWithData<T = any>(
    method: string,
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.request<T>({ ...config, url, method, data });
  }
}
