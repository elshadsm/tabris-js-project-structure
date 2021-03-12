import { OpenMainView } from '@actions/OpenMainView';
import { injectable, property, resolve } from 'tabris-decorators';

@injectable
export class LockViewModel {

  @property public input: string;

  public init(): void {
    this.input = 'test';
  }

  public login(): void {
    if (this.input === 'test') {
      resolve(OpenMainView).exec();
    }
  }

}
