import { JSONObject, Model, ModelValues } from '.';
import { nullable } from '@common/decorators';

export class Geo implements Model {

  @nullable public lat: string;
  @nullable public lng: string;

  constructor(data: ModelValues<Geo>) {
    Object.assign(this, data);
  }

  public toJSON(): JSONObject {
    const { lat, lng } = this;
    return { lat, lng };
  }

  toString(): string {
    return JSON.stringify(this.toJSON());
  }

}
