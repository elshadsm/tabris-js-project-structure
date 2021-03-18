import { expect, init, reset } from '@sandbox';
import { Injector } from 'tabris-decorators';
import { LockViewModel } from '@views/lock/LockViewModel';

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

  describe('init', () => {

    it('sets input to test', async () => {
      expect(model.input).to.equal('test');
    });

  });

});
