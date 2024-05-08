/* eslint-disable promise/catch-or-return */
import { AxiosRequestConfig, AxiosResponse } from '../interface';
import { parseHeaders } from '../utils/header';
import { createError } from '../utils/error';

export default async function xhr(
  config: AxiosRequestConfig,
): Promise<AxiosResponse> {
  return new Promise((resolve, reject) => {
    const {
      data = null,
      method = 'get',
      url,
      headers,
      responseType,
      timeout,
      cancelToken,
      withCredentials,
    } = config;

    const request = new XMLHttpRequest();

    if (responseType) {
      request.responseType = responseType;
    }

    if (timeout) {
      request.timeout = timeout;
    }

    if (withCredentials) {
      request.withCredentials = withCredentials;
    }

    request.open(method.toUpperCase(), url!, true);

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

      if (request.status === 0) {
        return;
      }

      const responseHeaders = parseHeaders(request.getAllResponseHeaders());
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

      handleResponse(response);
    };

    request.onerror = function handleError() {
      reject(createError('Network Error', config, null, request));
    };

    request.ontimeout = function handleTimeout() {
      reject(
        createError(
          `Timeout of ${timeout} ms exceeded`,
          config,
          'ECONNABORTED',
          request,
        ),
      );
    };

    if (cancelToken) {
      cancelToken.promise.then((cancel) => {
        request.abort();
        reject(cancel);
      });
    }

    request.send(data);

    function handleResponse(response: AxiosResponse) {
      if (response.status >= 200 && response.status < 300) {
        resolve(response);
      } else {
        reject(
          createError(
            `Request failed with status code ${response.status}`,
            config,
            null,
            request,
            response,
          ),
        );
      }
    }
  });
}
