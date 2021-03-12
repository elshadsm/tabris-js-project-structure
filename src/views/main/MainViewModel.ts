import { injectable, inject, property } from 'tabris-decorators';
import { UserRepository } from '@repositories/UserRepository';
import { texts } from '@resources';

@injectable
export class MainViewModel {

  @inject userRepository: UserRepository;

  @property public label: string;
  @property public buttonText: string;

  public async init() {
    this.label = texts.mainViewLabel;
    this.buttonText = texts.next;
    await this.userRepository.sync();
    this.userRepository.get().forEach(item => console.log(item.toString()));
  }

}
