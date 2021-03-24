import { Injector, injectable, inject, property } from 'tabris-decorators';
import { OpenUserDetailsView } from '@actions/OpenUserDetailsView';
import { UserRepository } from '@repositories/UserRepository';
import { texts } from '@resources';
import { User } from '@models/User';

@injectable
export class MainViewModel {

  @inject private injector: Injector;
  @inject userRepository: UserRepository;

  @property public message: string;
  @property public userList: User[];

  constructor() {
    this.initUserList().catch(console.error);
  }

  public async initUserList(): Promise<void> {
    this.message = texts.loading;
    await this.userRepository.sync();
    const list = this.userRepository.get();
    this.userList = list;
    this.message = list.length ? '' : texts.mainViewNoUserDataMessage;
  }

  public select(user: User): void {
    this.injector.resolve(OpenUserDetailsView).exec(user);
  }

}
