import { Injector, inject, injectable, property } from 'tabris-decorators';
import { OpenMainView } from '@actions/OpenMainView';

@injectable
export class LockViewModel {

  @inject private injector: Injector;

  @property public input: string;

  constructor() {
    this.input = 'test';
  }

  public login(): void {
    if (this.input === 'test') {
      this.injector.resolve(OpenMainView).exec();
    }
  }

}
