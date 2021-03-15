import { injectable, inject, property, create } from 'tabris-decorators';
import { UserRepository } from '@repositories/UserRepository';
import { User } from '@models/User';
import { OpenUserDetailsView } from '@actions/OpenUserDetailsView';

@injectable
export class MainViewModel {

  @inject userRepository: UserRepository;

  @property public userList: User[];

  public async init() {
    await this.userRepository.sync();
    this.userList = this.userRepository.get();
  }

  public select(user: User) {
    create(OpenUserDetailsView, {user}).exec();
  }

}
