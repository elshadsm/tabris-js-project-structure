import { injectable, prop } from 'tabris-decorators';
import { Model, ModelValues } from '.';

@injectable
export class Company implements Model {

  @prop({ nullable: true }) public name: string;
  @prop({ nullable: true }) public catchPhrase: string;
  @prop({ nullable: true }) public bs: string;

  constructor(data: ModelValues<Company>) {
    Object.assign(this, data);
  }

  toString(): string {
    return `* Company: { 
      name: ${this.name}
      catchPhrase: ${this.catchPhrase}
      bs: ${this.bs}
   }`;
  }

  public toJSON(): string {
    const {
      name,
      catchPhrase,
      bs } = this;
    return JSON.stringify({
      name,
      catchPhrase,
      bs
    });
  }

}
