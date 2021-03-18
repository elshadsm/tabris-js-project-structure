import { expect, init, reset, stub } from '@sandbox';
import { Injector } from 'tabris-decorators';
import { testJsonUsers, testStringifiedUsers, testUsers } from 'testData';
import { UserRepository } from '@repositories/UserRepository';
import Request from '@services/Request';

describe('UserRepository', () => {

  let injector: Injector;
  let request: Request;
  let userRepository: UserRepository;

  beforeEach(() => {
    init();
    injector = new Injector();
    injector.shared(UserRepository);
    injector.shared(Request);
    request = injector.resolve(Request);
    userRepository = injector.resolve(UserRepository);
  });

  afterEach(() => reset());

  describe('get', () => {

    it('returns empty array when no cached user data is available', () => {
      expect(userRepository.get()).to.deep.equal([]);
    });

    it('returns cached user data', () => {
      stub(localStorage, 'getItem').returns(testStringifiedUsers);

      expect(userRepository.get()).to.deep.equal(testUsers);
    });

  });

  describe('sync', () => {

    it('fetches user data from backend', async () => {
      stub(request, 'get').returns(Promise.resolve(testJsonUsers));

      await userRepository.sync();

      expect(userRepository.get()).to.deep.equal(testUsers);
    });

    it('stores fetched user data in local storage', async () => {
      stub(localStorage, 'setItem');
      stub(request, 'get').returns(Promise.resolve(testJsonUsers));

      await userRepository.sync();

      expect(localStorage.setItem).to.have.been.calledWith('user-data', testStringifiedUsers);
    });

  });

});
