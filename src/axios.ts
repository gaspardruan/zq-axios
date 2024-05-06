import { AxiosRequestConfig, AxiosResponse } from './interface';
import Axios from './core/Axios';
import { extend } from './utils/util';

interface AxiosInstance extends Axios {
  <T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>>;

  <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
}

function createInstance(): AxiosInstance {
  const context = new Axios();
  const instance = Axios.prototype.request.bind(context);

  extend(instance, context);
  return instance as AxiosInstance;
}

const axios = createInstance();

export default axios;
