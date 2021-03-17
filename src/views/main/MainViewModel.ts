import { create, injectable, inject, property } from 'tabris-decorators';
import { OpenUserDetailsView } from '@actions/OpenUserDetailsView';
import { UserRepository } from '@repositories/UserRepository';
import { ViewModel } from '@views/shared/ViewModel';
import { texts } from '@resources';
import { User } from '@models/User';

@injectable
export class MainViewModel extends ViewModel {

  @inject userRepository: UserRepository;

  @property public message: string;
  @property public userList: User[];

  public async init() {
    this.message = texts.loading;
    await this.userRepository.sync();
    const list = this.userRepository.get();
    this.userList = list;
    this.message = list.length ? '' : texts.mainViewNoUserDataMessage;
  }

  public select(user: User) {
    create(OpenUserDetailsView, { user }).exec();
  }

}
