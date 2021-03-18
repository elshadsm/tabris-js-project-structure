/* eslint-disable @typescript-eslint/no-explicit-any */

import { injectable, prop } from 'tabris-decorators';
import { JSONObject, Model } from '.';

@injectable
export class CustomError extends Error implements Model {

  @prop({ nullable: true }) public type: string;
  @prop({ nullable: true }) public url: string;
  @prop({ nullable: true }) public response: any;
  @prop({ nullable: true }) public cause: string;

  constructor(data: Partial<CustomError>) {
    super();
    Object.assign(this, data);
  }

  public toJSON(): JSONObject {
    const { message, type, response, cause } = this;
    return { message, type, response, cause };
  }

  toString(): string {
    return `* CustomError: { 
      message: ${this.message}
      type: ${this.type}
      response: ${this.response}
      cause: ${this.cause}
   }`;
  }

}
