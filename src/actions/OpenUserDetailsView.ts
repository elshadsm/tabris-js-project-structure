import { injectable, inject, prop } from 'tabris-decorators';
import { UserDetailsView } from '@views/user-details/UserDetailsView';
import { Navigation } from '@services/Navigation';
import { Action } from './Action';
import { User } from '@models/User';

@injectable
export class OpenUserDetailsView extends Action {

  @inject navigation: Navigation

  @prop user: User;

  exec(): void {
    this.navigation.navigateToPage(UserDetailsView, this.user);
  }

}
