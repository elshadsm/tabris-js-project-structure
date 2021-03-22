import { injectable, inject } from 'tabris-decorators';
import { Navigation } from './Navigation';
import { LockView } from '@views/lock/LockView';

@injectable
export class App {

  @inject navigation: Navigation

  public start(): void {
    this.navigation.navigateToScreen(LockView);
  }

}
