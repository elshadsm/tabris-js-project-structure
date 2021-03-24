import { injectable, inject } from 'tabris-decorators';
import { UserDetailsView } from '@views/user-details/UserDetailsView';
import { Navigation } from '@services/Navigation';
import { Action } from './Action';
import { User } from '@models/User';

@injectable
export class OpenUserDetailsView extends Action {

  @inject navigation: Navigation

  exec(user: User): void {
    this.navigation.navigateToPage(UserDetailsView, {user});
  }

}
