import { AxiosRequestConfig, AxiosResponse } from '../interface';

export class AxiosError extends Error {
  isAxiosError: boolean;
  config: AxiosRequestConfig;
  code?: string | null;
  request?: XMLHttpRequest;
  response?: AxiosResponse;

  constructor(
    message: string,
    config: any,
    code?: string | null,
    request?: any,
    response?: any,
  ) {
    super(message);
    this.isAxiosError = true;
    this.config = config;
    this.code = code;
    this.request = request;
    this.response = response;
    Object.setPrototypeOf(this, AxiosError.prototype);
  }
}

export function createError(
  message: string,
  config: AxiosRequestConfig,
  code?: string | null,
  request?: XMLHttpRequest,
  response?: AxiosResponse,
) {
  const error = new AxiosError(message, config, code, request, response);
  return error;
}
