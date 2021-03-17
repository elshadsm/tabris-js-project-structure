import { injectable, property, resolve } from 'tabris-decorators';
import { OpenMainView } from '@actions/OpenMainView';
import { ViewModel } from '@views/shared/ViewModel';

@injectable
export class LockViewModel extends ViewModel {

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
