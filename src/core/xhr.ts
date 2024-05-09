/* eslint-disable promise/catch-or-return */
import { AxiosRequestConfig, AxiosResponse } from '../interface';
import { parseHeaders } from '../utils/header';
import { createError } from '../utils/error';
import { isURLSameOrigin } from '../utils/url';
import { isFormData } from '../utils/util';
import cookie from '../utils/cookie';

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
      xsrfCookieName,
      xsrfHeaderName,
      onDownloadProgress,
      onUploadProgress,
    } = config;

    const request = new XMLHttpRequest();
    request.open(method.toUpperCase(), url!, true);
    configRequest();
    processHeaders();
    addEvents();
    processCancel();
    request.send(data);

    function configRequest() {
      if (responseType) {
        request.responseType = responseType;
      }

      if (timeout) {
        request.timeout = timeout;
      }

      if (withCredentials) {
        request.withCredentials = withCredentials;
      }
    }

    function addEvents() {
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

      if (onDownloadProgress) {
        request.onprogress = onDownloadProgress;
      }

      if (onUploadProgress) {
        request.upload.onprogress = onUploadProgress;
      }
    }

    function processHeaders() {
      if (isFormData(data)) {
        delete headers['Content-Type'];
      }

      if ((withCredentials || isURLSameOrigin(url!)) && xsrfCookieName) {
        const xsrfValue = cookie.read(xsrfCookieName);
        if (xsrfValue && xsrfHeaderName) {
          headers[xsrfHeaderName!] = xsrfValue;
        }
      }

      Object.keys(headers).forEach((name) => {
        if (data === null && name.toLowerCase() === 'content-type') {
          delete headers[name];
        }
        request.setRequestHeader(name, headers[name]);
      });
    }

    function processCancel() {
      if (cancelToken) {
        cancelToken.promise.then((cancel) => {
          request.abort();
          reject(cancel);
        });
      }
    }

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
