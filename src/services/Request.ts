/* eslint-disable @typescript-eslint/no-explicit-any */
import { shared } from 'tabris-decorators';

const REQUEST_TIMEOUT = 10 * 1000;

@shared
export default class Request {

  public async get(options: RequestOptions): Promise<any> {
    const { url, headers, requestTimeout, responseType } = this.checkRequestOptions(options);
    const init = { method: 'GET', headers };
    try {
      const response = await this.fetchWithTimeout(url, init, requestTimeout);
      const data = await this.parseResponse(response, responseType);
      return this.validateResponse(data, url);
    } catch (error) {
      this.handleFetchError(error, url);
    }
    return null;
  }

  public async post(options: RequestOptions) {
    const { url, body, headers, requestTimeout, responseType } = this.checkRequestOptions(options);
    const init = {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    };
    try {
      const response = await this.fetchWithTimeout(url, init, requestTimeout);
      const data = await this.parseResponse(response, responseType);
      return this.validateResponse(data, url);
    } catch (error) {
      this.handleFetchError(error, url);
    }
    return null;
  }

  private checkRequestOptions(options: RequestOptions): RequestOptions {
    return {
      url: options.url || '',
      body: options.body || {},
      headers: options.headers || {},
      requestTimeout: options.requestTimeout || REQUEST_TIMEOUT,
      responseType: options.responseType || 'json'
    };
  }

  private async fetchWithTimeout(url: string, init: RequestInit, requestTimeout = REQUEST_TIMEOUT) {
    return requestTimeout === 0 ?
      fetch(url, init) :
      this.timeout(requestTimeout, fetch(url, init));
  }

  private async timeout(millisecond: number, promise: Promise<any>) {
    return new Promise((_resolve, _reject) => {
      const timeoutId = setTimeout(() => {
        const error = new Error('timeout');
        _reject(error);
      }, millisecond);
      promise.then(
        (result) => {
          clearTimeout(timeoutId);
          _resolve(result);
        },
        (error) => {
          clearTimeout(timeoutId);
          _reject(error);
        }
      );
    });
  }

  private handleFetchError(cause: any, url: string) {
    const error = new Error('* Request failed');
    throw Object.assign(error, { type: 'network', url, cause });
  }

  private async parseResponse(response: any, responseType?: 'text' | 'json') {
    if (responseType === 'json') {
      return this.parseJson(response);
    }
    return this.parseText(response);
  }

  private async parseJson(response: any) {
    try {
      const data = await response.json();
      response.body = data;
      return response;
    } catch (error) {
      console.error(`* parseJson: ${error}`);
      response.body = null;
      return response;
    }
  }

  private async parseText(response: any) {
    try {
      const data = await response.text();
      response.body = data;
      return response;
    } catch (error) {
      console.error(`* parseText: ${error}`);
      response.body = null;
      return response;
    }
  }

  private validateResponse(response: any, url: string) {
    if (!response.ok) {
      const error = new Error(`* Request failed:\n* Status: ${response.status}\n* Status text: ${response.statusText}`);
      throw Object.assign(error, { type: 'server', url, response });
    }
    return response.body;
  }

}

type RequestOptions = {
  url: string;
  body?: any,
  headers?: any;
  requestTimeout?: number;
  responseType?: 'text' | 'json'
};
