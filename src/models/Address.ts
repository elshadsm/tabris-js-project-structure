import { prop } from 'tabris-decorators';
import { Model, ModelValues } from '.';
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

  public toString(): string {
    return `* Address: { 
      street: ${this.street}
      suite: ${this.suite}
      city: ${this.city}
      zipcode:${this.zipcode}
      geo: ${this.geo}
   }`;
  }

  public toJSON(): string {
    const {
      street,
      suite,
      city,
      zipcode,
      geo } = this;
    return JSON.stringify({
      street,
      suite,
      city,
      zipcode,
      geo
    });
  }

}
