import { expect, init, reset, stub } from '@sandbox';
import { Injector } from 'tabris-decorators';
import { UserRepository } from '@repositories/UserRepository';
import { MainViewModel } from '@views/main/MainViewModel';
import { testUsers } from 'testData';
import { wait } from 'shared';
import Request from '@services/Request';

describe('MainViewModel', () => {

  let injector: Injector;
  let model: MainViewModel;
  let userRepository: UserRepository;
  let currentTestIndex = 0;

  beforeEach(() => {
    init();
    injector = new Injector();
    injector.injectable(MainViewModel);
    injector.shared(UserRepository);
    injector.shared(Request);
    userRepository = injector.resolve(UserRepository);
    stubUserRepository();
    model = injector.resolve(MainViewModel);
  });

  afterEach(() => reset());

  describe('init', () => {

    it('renders loading message', async () => {
      expect(model.message).to.equal('Loading...');
    });

    it('renders user list and hides message', async () => {
      await wait();

      expect(model.userList.length).to.equal(2);
      expect(model.message).to.equal('');
    });

    it('renders message and hides user list', async () => {
      await wait();

      expect(model.userList.length).to.equal(0);
      expect(model.message).to.equal('No user data is available.');
    });

  });

  function stubUserRepository() {
    const users = currentTestIndex === 1 ? testUsers : [];
    if (currentTestIndex > 0) {
      stub(userRepository, 'sync');
      stub(userRepository, 'get').returns(users);
    }
    currentTestIndex++;
  }

});