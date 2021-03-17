import { injectable, prop } from 'tabris-decorators';
import { JSONObject, Model, ModelValues } from '.';

@injectable
export class Geo implements Model {

  @prop({ nullable: true }) public lat: string;
  @prop({ nullable: true }) public lng: string;

  constructor(data: ModelValues<Geo>) {
    Object.assign(this, data);
  }

  public toJSON(): JSONObject {
    const { lat, lng } = this;
    return { lat, lng };
  }

  toString(): string {
    return `* Geo: { 
      lat: ${this.lat}
      lng: ${this.lng}
   }`;
  }

}
