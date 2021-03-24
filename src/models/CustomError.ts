import { JSONObject, Model } from '.';
import { nullable } from '@common/decorators';

export class CustomError extends Error implements Model {

  @nullable public type: string;
  @nullable public url: string;
  @nullable public cause: string;

  constructor(data: Partial<CustomError>) {
    super();
    Object.assign(this, data);
  }

  public toJSON(): JSONObject {
    const { message, type, cause } = this;
    return { message, type, cause };
  }

  toString(): string {
    return JSON.stringify(this.toJSON());
  }

}
