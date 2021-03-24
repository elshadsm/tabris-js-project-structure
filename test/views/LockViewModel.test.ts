import { expect, init, reset, stub } from '@sandbox';
import { Injector } from 'tabris-decorators';
import { LockViewModel } from '@views/lock/LockViewModel';
import { OpenMainView } from '@actions/OpenMainView';
import { Navigation } from '@services/Navigation';
import { SinonStub } from 'sinon';

describe('LockViewModel', () => {

  let injector: Injector;
  let model: LockViewModel;
  let exec: SinonStub;

  beforeEach(() => {
    init();
    injector = new Injector();
    injector.injectable(LockViewModel);
    injector.shared(Navigation);
    model = injector.resolve(LockViewModel);
    const openMainView = new OpenMainView();
    injector.register(OpenMainView, openMainView);
    exec = stub(openMainView, 'exec');
  });

  afterEach(() => reset());

  it('init sets input to test', () => {
    expect(model.input).to.equal('test');
  });

  describe('login', () => {

    it('executes OpenMainView action when input is test', () => {
      model.input = 'test';

      model.login();

      expect(exec).to.have.been.called;
    });

    it('not executes OpenMainView action when input is not test', () => {
      model.input = 'foo';

      model.login();

      expect(exec).not.to.have.been.called;
    });

  });

});
