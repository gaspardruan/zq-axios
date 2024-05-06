import dispatchRequest from './core/dispatchRequest';
import xhr from './core/xhr';
import axios from './axios';

export * from './interface';
export * from './utils/url';
export * from './utils/data';
export * from './utils/header';
export * from './utils/error';
export { xhr, dispatchRequest };

export default axios;
