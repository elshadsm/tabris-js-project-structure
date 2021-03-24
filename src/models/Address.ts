import { JSONObject, Model, ModelValues } from '.';
import { nullable } from '@common/decorators';
import { Geo } from './Geo';

export class Address implements Model {

  @nullable public street: string;
  @nullable public suite: string;
  @nullable public city: string;
  @nullable public zipcode: string;
  @nullable public geo: Geo;

  constructor(data: ModelValues<Address>) {
    Object.assign(this, data);
  }

  public toJSON(): JSONObject {
    const { street, suite, city, zipcode, geo } = this;
    return { street, suite, city, zipcode, geo: geo.toJSON() };
  }

  toString(): string {
    return JSON.stringify(this.toJSON());
  }

}
