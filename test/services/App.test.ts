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
    app = injector.resolve(App);
  });

  afterEach(() => reset());

  it('start navigates to LockView screen', () => {
    stub(navigation, 'navigateToScreen');

    app.start();

    expect(navigation.navigateToScreen).to.have.been.calledWith(LockView);
  });

});
