import { AxiosRequestConfig, AxiosResponse } from './interface';
import Axios from './core/Axios';
import { extend } from './utils/util';
import defaults from './defaults';

interface AxiosInstance extends Axios {
  <T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>>;

  <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
}

function createInstance(config: AxiosRequestConfig): AxiosInstance {
  const context = new Axios(config);
  const instance = Axios.prototype.request.bind(context);

  extend(instance, context);
  return instance as AxiosInstance;
}

const axios = createInstance(defaults);

export default axios;
