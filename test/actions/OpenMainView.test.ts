import { expect, init, reset, stub } from '@sandbox';
import { Injector } from 'tabris-decorators';
import { OpenMainView } from '@actions/OpenMainView';
import { Navigation } from '@services/Navigation';
import { MainView } from '@views/main/MainView';

describe('OpenMainView', () => {

  let injector: Injector;
  let navigation: Navigation;
  let openMainView: OpenMainView;

  beforeEach(() => {
    init();
    injector = new Injector();
    injector.shared(Navigation);
    injector.shared(OpenMainView);
    navigation = injector.resolve(Navigation);
    openMainView = injector.resolve(OpenMainView);
  });

  afterEach(() => reset());

  it('navigates to MainView page', () => {
    stub(navigation, 'navigateToPage');

    openMainView.exec();

    expect(navigation.navigateToPage).to.have.been.calledWith(MainView);
  });

});
