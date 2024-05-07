import { AxiosRequestConfig, AxiosResponse } from './interface';
import Axios from './core/Axios';
import { extend } from './utils/util';
import defaults from './defaults';
import mergeConfig from './core/mergeConfig';

interface AxiosInstance extends Axios {
  <T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>>;

  <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
}

interface AxiosStatic extends AxiosInstance {
  create(config?: AxiosRequestConfig): AxiosInstance;
}

function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config);
  const instance = Axios.prototype.request.bind(context);

  extend(instance, context);
  return instance as AxiosStatic;
}

const axios = createInstance(defaults);

axios.create = function create(config) {
  return createInstance(mergeConfig(defaults, config));
};

export default axios;
