import { JSONObject, Model, ModelValues } from '.';
import { nullable } from '@common/decorators';

export class Company implements Model {

  @nullable public name: string;
  @nullable public catchPhrase: string;
  @nullable public bs: string;

  constructor(data: ModelValues<Company>) {
    Object.assign(this, data);
  }

  public toJSON(): JSONObject {
    const { name, catchPhrase, bs } = this;
    return { name, catchPhrase, bs };
  }

  toString(): string {
    return JSON.stringify(this.toJSON());
  }

}
