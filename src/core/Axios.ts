import {
  AxiosRequestConfig,
  AxiosResponse,
  ResolvedFn,
  RejectedFn,
} from '../interface';
import dispatchRequest from './dispatchRequest';
import InterceptorManager from './interceptorManager';

interface Interceptors {
  request: InterceptorManager<AxiosRequestConfig>;
  response: InterceptorManager<AxiosResponse>;
}

interface PromiseChain<T> {
  resolved: ResolvedFn<T> | ((config: AxiosRequestConfig) => AxiosResponse);
  rejected?: RejectedFn;
}

export default class Axios {
  interceptors: Interceptors;
  // request(config: AxiosRequestConfig): Promise<AxiosResponse> {
  //   return dispatchRequest(config);
  // }

  constructor() {
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponse>(),
    };
  }

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

    const chain: PromiseChain<any>[] = [
      {
        resolved: dispatchRequest,
        rejected: undefined,
      },
    ];

    this.interceptors.request.forEach((interceptor) => {
      chain.unshift(interceptor);
    });

    this.interceptors.response.forEach((interceptor) => {
      chain.push(interceptor);
    });

    let promise = Promise.resolve(config);
    while (chain.length) {
      const { resolved, rejected } = chain.shift()!;
      promise = promise.then(resolved, rejected);
    }

    return promise;
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
