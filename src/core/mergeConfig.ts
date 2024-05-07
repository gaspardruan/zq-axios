/* eslint-disable guard-for-in */
/* eslint-disable no-param-reassign */
import { AxiosRequestConfig } from '../interface';
import { isPlainObject, deepMerge } from '../utils/util';

const strategy = Object.create(null);

function defaultStrategy(val1: any, val2: any): any {
  return typeof val2 !== 'undefined' ? val2 : val1;
}

function fromVal2Strategy(val1: any, val2: any): any {
  return val2;
}

// eslint-disable-next-line consistent-return
function deepMergeStrategy(val1: any, val2: any): any {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2);
  }
  if (typeof val2 !== 'undefined') {
    return val2;
  }
  if (isPlainObject(val1)) {
    return deepMerge(val1);
  }
  if (typeof val1 !== 'undefined') {
    return val1;
  }
}

const fv2StrategyKeys = ['url', 'params', 'data'];

const dmStrategyKeys = ['headers'];

dmStrategyKeys.forEach((key) => {
  strategy[key] = deepMergeStrategy;
});

fv2StrategyKeys.forEach((key) => {
  strategy[key] = fromVal2Strategy;
});

export default function mergeConfig(
  config1: AxiosRequestConfig,
  config2?: AxiosRequestConfig,
): AxiosRequestConfig {
  if (!config2) {
    config2 = {};
  }

  const config = Object.create(null);

  for (const key in config2) {
    mergeField(key);
  }

  for (const key in config1) {
    if (!config2[key]) {
      mergeField(key);
    }
  }

  function mergeField(key: string): void {
    const strategyFn = strategy[key] || defaultStrategy;
    config[key] = strategyFn(config1[key], config2![key]);
  }

  return config;
}
