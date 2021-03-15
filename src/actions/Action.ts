/* eslint-disable @typescript-eslint/no-explicit-any */

export abstract class Action {

  constructor(properties?: any) {
    Object.assign(this, properties);
  }

  abstract exec(): unknown;

}
