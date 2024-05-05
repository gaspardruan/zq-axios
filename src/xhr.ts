import { AxiosPromise, AxiosRequestConfig } from './interface';

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve) => {
    const { data = null, method = 'get', url, headers, responseType } = config;

    const request = new XMLHttpRequest();

    if (responseType) {
      request.responseType = responseType;
    }

    request.open(method.toUpperCase(), url, true);

    Object.keys(headers).forEach((name) => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name];
      }
      request.setRequestHeader(name, headers[name]);
    });

    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return;
      }

      const responseHeaders = request.getAllResponseHeaders();
      const responseData =
        responseType && responseType !== 'text'
          ? request.response
          : request.responseText;

      const response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request,
      };

      resolve(response);
    };

    request.send(data);
  });
}
