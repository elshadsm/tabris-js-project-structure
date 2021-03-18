import { expect, init, reset, stub } from '@sandbox';
import { Injector } from 'tabris-decorators';
import { Navigation } from '@services/Navigation';
import { LockView } from '@views/lock/LockView';
import { App } from '@services/App';

describe('App', () => {

  let injector: Injector;
  let navigation: Navigation;
  let app: App;

  beforeEach(() => {
    init();
    injector = new Injector();
    injector.shared(Navigation);
    injector.shared(App);
    navigation = injector.resolve(Navigation);
    stub(navigation, 'navigateToScreen');
    app = injector.resolve(App);
  });

  afterEach(() => reset());

  describe('start', () => {

    it('navigates to LockView screen', () => {
      app.start();

      expect(navigation.navigateToScreen).to.have.been.calledWith(LockView);
    });

  });

});
