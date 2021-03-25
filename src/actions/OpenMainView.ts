import { injectable, inject } from 'tabris-decorators';
import { Navigation } from '@services/Navigation';
import { MainView } from '@views/main/MainView';
import { Action } from './Action';

@injectable
export class OpenMainView implements Action {

  @inject navigation: Navigation

  exec(): void {
    this.navigation.navigateToPage(MainView);
  }

}
