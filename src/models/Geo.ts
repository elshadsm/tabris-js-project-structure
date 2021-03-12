import { injectable, prop } from 'tabris-decorators';
import { Model, ModelValues } from '.';

@injectable
export class Geo implements Model {

  @prop({ nullable: true }) public lat: string;
  @prop({ nullable: true }) public lng: string;

  constructor(data: ModelValues<Geo>) {
    Object.assign(this, data);
  }

  toString(): string {
    return `* Geo: { 
      lat: ${this.lat}
      lng: ${this.lng}
   }`;
  }

  public toJSON(): string {
    const {
      lat,
      lng } = this;
    return JSON.stringify({
      lat,
      lng
    });
  }

}
