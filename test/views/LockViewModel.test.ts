import { expect, init, reset, stub } from '@sandbox';
import { Injector } from 'tabris-decorators';
import { LockViewModel } from '@views/lock/LockViewModel';
import { OpenMainView } from '@actions/OpenMainView';

describe('LockViewModel', () => {

  let injector: Injector;
  let model: LockViewModel;

  beforeEach(() => {
    init();
    injector = new Injector();
    injector.injectable(LockViewModel);
    model = injector.resolve(LockViewModel);
  });

  afterEach(() => reset());

  it('init sets input to test', () => {
    expect(model.input).to.equal('test');
  });

  describe('login', () => {

    it('dispatches OpenMainView action when input is test', () => {
      model.input = 'test';
      stub(model, 'dispatch');

      model.login();

      expect(model.dispatch).to.have.been.calledWith(OpenMainView);
    });

    it('not dispatches OpenMainView action when input is not test', () => {
      model.input = 'foo';
      stub(model, 'dispatch');

      model.login();

      expect(model.dispatch).not.to.have.been.calledWith(OpenMainView);
    });

  });

});
