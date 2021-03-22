import { injectable, prop } from 'tabris-decorators';
import { JSONObject, Model } from '.';

@injectable
export class CustomError extends Error implements Model {

  @prop({ nullable: true }) public type: string;
  @prop({ nullable: true }) public url: string;
  @prop({ nullable: true }) public cause: string;

  constructor(data: Partial<CustomError>) {
    super();
    Object.assign(this, data);
  }

  public toJSON(): JSONObject {
    const { message, type, cause } = this;
    return { message, type, cause };
  }

  toString(): string {
    return `* CustomError: { 
      message: ${this.message}
      type: ${this.type}
      cause: ${this.cause}
   }`;
  }

}
