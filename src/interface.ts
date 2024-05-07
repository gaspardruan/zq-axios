export type Method =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'delete'
  | 'DELETE'
  | 'options'
  | 'OPTIONS'
  | 'head'
  | 'HEAD'
  | 'patch'
  | 'PATCH';

export interface AxiosRequestConfig {
  url?: string;
  method?: Method;
  data?: any;
  params?: any;
  headers?: any;
  responseType?: XMLHttpRequestResponseType;
  timeout?: number;

  [propName: string]: any;
}

export interface AxiosResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: AxiosRequestConfig;
  request: XMLHttpRequest;
}

// export interface AxiosError extends Error {
//   isAxiosError: boolean;
//   config: AxiosRequestConfig;
//   code?: string | null;
//   request?: XMLHttpRequest;
//   response?: AxiosResponse;
// }

// export interface Axios {
//   request(config: AxiosRequestConfig): Promise<AxiosResponse>;
//   get(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse>;
//   delete(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse>;
//   head(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse>;
//   options(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse>;
//   post(
//     url: string,
//     data?: any,
//     config?: AxiosRequestConfig,
//   ): Promise<AxiosResponse>;
//   put(
//     url: string,
//     data?: any,
//     config?: AxiosRequestConfig,
//   ): Promise<AxiosResponse>;
//   patch(
//     url: string,
//     data?: any,
//     config?: AxiosRequestConfig,
//   ): Promise<AxiosResponse>;
// }

// export interface AxiosInstance extends Axios {
//   (config: AxiosRequestConfig): Promise<AxiosResponse>;
// }

export interface ResolvedFn<T> {
  (val: T): T | Promise<T>;
}

export interface RejectedFn {
  (error: any): any;
}

// export interface AxiosInterceptorManager<T> {
//   use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number;
//   eject(id: number): void;
// }
