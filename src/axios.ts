import { AxiosRequestConfig, AxiosResponse } from './interface';
import Axios from './core/Axios';
import { extend } from './utils/util';

interface AxiosInstance extends Axios {
  (config: AxiosRequestConfig): Promise<AxiosResponse>;
}

function createInstance(): AxiosInstance {
  const context = new Axios();
  const instance = Axios.prototype.request.bind(context);

  extend(instance, context);
  return instance as AxiosInstance;
}

const axios = createInstance();

export default axios;
