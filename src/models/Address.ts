import { prop } from 'tabris-decorators';
import { JSONObject, Model, ModelValues } from '.';
import { Geo } from './Geo';

export class Address implements Model {

  @prop({ nullable: true }) public street: string;
  @prop({ nullable: true }) public suite: string;
  @prop({ nullable: true }) public city: string;
  @prop({ nullable: true }) public zipcode: string;
  @prop({ nullable: true }) public geo: Geo;

  constructor(data: ModelValues<Address>) {
    Object.assign(this, data);
  }

  public toJSON(): JSONObject {
    const {
      street,
      suite,
      city,
      zipcode,
      geo } = this;
    return {
      street,
      suite,
      city,
      zipcode,
      geo: geo.toJSON()
    };
  }

  public toString(): string {
    return `* Address: { 
      street: ${this.street}
      suite: ${this.suite}
      city: ${this.city}
      zipcode:${this.zipcode}
      geo: ${this.geo}
   }`;
  }

}
