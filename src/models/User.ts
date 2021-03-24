import { JSONObject, Model, ModelValues } from '.';
import { nullable } from '@common/decorators';
import { Address } from './Address';
import { Company } from './Company';

export class User implements Model {

  @nullable public id: number;
  @nullable public name: string;
  @nullable public username: string;
  @nullable public email: string;
  @nullable public phone: string;
  @nullable public website: string;
  @nullable public address: Address;
  @nullable public company: Company;

  constructor(data: ModelValues<User>) {
    Object.assign(this, data);
  }

  public toJSON(): JSONObject {
    const { id, name, username, email, phone, website, address, company } = this;
    return { id, name, username, email, phone, website, address: address.toJSON(), company: company.toJSON() };
  }

  toString(): string {
    return JSON.stringify(this.toJSON());
  }

}
