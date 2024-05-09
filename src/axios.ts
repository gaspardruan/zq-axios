/* eslint-disable guard-for-in */
import {
  AxiosRequestConfig,
  AxiosResponse,
  CancelTokenStatic,
  CancelStatic,
} from './interface';
import Axios from './core/Axios';
import { extend, extendMethod } from './utils/util';
import defaults from './defaults';
import mergeConfig from './core/mergeConfig';
import CancelToken from './core/CancelToken';
import Cancel, { isCancel } from './core/Cancel';

interface AxiosInstance extends Axios {
  <T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>>;

  <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
}

interface AxiosStatic extends AxiosInstance {
  create(config?: AxiosRequestConfig): AxiosInstance;

  CancelToken: CancelTokenStatic;
  Cancel: CancelStatic;
  isCancel: (value: any) => boolean;

  all<T>(promises: Array<T | Promise<T>>): Promise<T[]>;

  spread<T, R>(callback: (...args: T[]) => R): (arr: T[]) => R;

  Axios: typeof Axios;
}

function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config);
  const instance = Axios.prototype.request.bind(context);

  extend(instance, context);
  extendMethod(instance, context);

  return instance as AxiosStatic;
}

const axios = createInstance(defaults);

axios.create = function create(config) {
  return createInstance(mergeConfig(defaults, config));
};

axios.CancelToken = CancelToken;
axios.Cancel = Cancel;
axios.isCancel = isCancel;

axios.all = function all(promises) {
  return Promise.all(promises);
};

axios.spread = function spread(callback) {
  return function wrap(arr) {
    return callback(...arr);
  };
};

axios.Axios = Axios;

export default axios;
