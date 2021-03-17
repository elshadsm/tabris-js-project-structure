import { injectable, prop } from 'tabris-decorators';
import { JSONObject, Model, ModelValues } from '.';
import { Address } from './Address';
import { Company } from './Company';

@injectable
export class User implements Model {

  @prop({ nullable: true }) public id: number;
  @prop({ nullable: true }) public name: string;
  @prop({ nullable: true }) public username: string;
  @prop({ nullable: true }) public email: string;
  @prop({ nullable: true }) public phone: string;
  @prop({ nullable: true }) public website: string;
  @prop({ nullable: true }) public address: Address;
  @prop({ nullable: true }) public company: Company;

  constructor(data: ModelValues<User>) {
    Object.assign(this, data);
  }

  public toJSON(): JSONObject {
    const {
      id,
      name,
      username,
      email,
      address,
      phone,
      website,
      company } = this;
    return {
      id,
      name,
      username,
      email,
      phone,
      website,
      address: address.toJSON(),
      company: company.toJSON()
    };
  }

  toString(): string {
    return `* User: { 
      id: ${this.id}
      name: ${this.name}
      username: ${this.username}
      email:${this.email}
      phone: ${this.phone}
      website: ${this.website}
      address: ${this.address}
      company: ${this.company}
   }`;
  }

}
