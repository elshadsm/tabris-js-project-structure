/* eslint-disable @typescript-eslint/no-explicit-any */
import { JSONValue } from '@models/index';
import { CustomError } from '@models/CustomError';
import { shared } from 'tabris-decorators';

const DEFAULT_REQUEST_TIMEOUT = 10 * 1000;

@shared
export default class Request {

  public async get(options: RequestOptions): Promise<any> {
    const { url, headers, requestTimeout, responseType } = this.checkRequestOptions(options);
    const init = { method: 'GET', headers };
    const response = await this.fetchWithTimeout(url, init, requestTimeout);
    this.validateResponse(response, url);
    return await this.parseResponse(response, responseType);
  }

  public async post(options: RequestOptions): Promise<any> {
    const { url, body, headers, requestTimeout, responseType } = this.checkRequestOptions(options);
    const init = {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    };
    const response = await this.fetchWithTimeout(url, init, requestTimeout);
    this.validateResponse(response, url);
    return await this.parseResponse(response, responseType);
  }

  private checkRequestOptions(options: RequestOptions): RequestOptions {
    return {
      url: options.url || '',
      body: options.body || {},
      headers: options.headers || {},
      requestTimeout: options.requestTimeout || DEFAULT_REQUEST_TIMEOUT,
      responseType: options.responseType || 'json'
    };
  }

  private async fetchWithTimeout(url: string,
    init: RequestInit,
    requestTimeout = DEFAULT_REQUEST_TIMEOUT): Promise<Response> {
    try {
      if (requestTimeout === 0) {
        return await fetch(url, init);
      }
      return await this.timeout(requestTimeout, fetch(url, init));
    } catch (error) {
      error.type = 'network';
      error.url = url;
      throw error;
    }
  }

  private async timeout(millisecond: number, promise: Promise<any>): Promise<Response> {
    return new Promise((_resolve, _reject) => {
      const timeoutId = setTimeout(() => {
        const error = new Error('* Timeout');
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

  private async parseResponse(response: any, responseType?: 'text' | 'json'): Promise<JSONValue | string> {
    if (responseType === 'json') {
      return this.parseJson(response);
    }
    return this.parseText(response);
  }

  private async parseJson(response: any): Promise<JSONValue> {
    try {
      return await response.json();
    } catch (error) {
      console.error(`* Error parseJson: ${error}`);
      return null;
    }
  }

  private async parseText(response: any): Promise<string> {
    try {
      return await response.text();
    } catch (error) {
      console.error(`* Error parseText: ${error}`);
      return null;
    }
  }

  private validateResponse(response: any, url: string): void {
    if (!response.ok) {
      const message = `* Request failed:\n* Status: ${response.status}\n* Status text: ${response.statusText}`;
      throw new CustomError({
        message,
        type: 'server',
        url,
        response
      });
    }
  }

}

export type RequestOptions = {
  url: string;
  body?: any,
  headers?: any;
  requestTimeout?: number;
  responseType?: 'text' | 'json'
};
