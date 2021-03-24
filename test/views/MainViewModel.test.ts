import { expect, init, reset, stub } from '@sandbox';
import { Injector } from 'tabris-decorators';
import { OpenUserDetailsView } from '@actions/OpenUserDetailsView';
import { UserRepository } from '@repositories/UserRepository';
import { MainViewModel } from '@views/main/MainViewModel';
import { Navigation } from '@services/Navigation';
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

    it('renders loading message', () => {
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

  // mocha runs tests in the order of the description definition.
  describe('select', () => {

    it('executes OpenUserDetailsView action', () => {
      injector.shared(Navigation);
      const openUserDetailsView = new OpenUserDetailsView();
      injector.register(OpenUserDetailsView, openUserDetailsView);
      const exec = stub(openUserDetailsView, 'exec');

      model.select(testUsers[0]);

      expect(exec).to.have.been.calledWith(testUsers[0]);
    });

  });

  function stubUserRepository(): void {
    const users = currentTestIndex === 1 ? testUsers : [];
    if (currentTestIndex > 0) {
      stub(userRepository, 'sync');
      stub(userRepository, 'get').returns(users);
    }
    currentTestIndex++;
  }

});
