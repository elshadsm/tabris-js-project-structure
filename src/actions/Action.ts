import { CustomError } from '@models/CustomError';

export abstract class Action {

  abstract exec(): unknown;

  public set<T extends Partial<this>>(properties: T) {
    if (arguments.length === 0) {
      this.throwError('Not enough arguments');
    }
    if (arguments.length > 1) {
      this.throwError('Too many arguments');
    }
    Object.assign(this, properties);
    return this;
  }

  private throwError(message: string): void {
    throw new CustomError({
      message,
      type: 'runtime'
    });
  }

}
