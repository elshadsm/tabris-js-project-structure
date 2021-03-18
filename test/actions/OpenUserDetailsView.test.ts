import { expect, init, reset, stub } from '@sandbox';
import { Injector } from 'tabris-decorators';
import { OpenUserDetailsView } from '@actions/OpenUserDetailsView';
import { UserDetailsView } from '@views/user-details/UserDetailsView';
import { Navigation } from '@services/Navigation';

describe('OpenUserDetailsView', () => {

  let injector: Injector;
  let navigation: Navigation;
  let openUserDetailsView: OpenUserDetailsView;

  beforeEach(() => {
    init();
    injector = new Injector();
    injector.shared(Navigation);
    injector.shared(OpenUserDetailsView);
    navigation = injector.resolve(Navigation);
    stub(navigation, 'navigateToPage');
    openUserDetailsView = injector.resolve(OpenUserDetailsView);
  });

  afterEach(() => reset());

  it('navigates to UserDetailsView page', () => {
    openUserDetailsView.exec();

    expect(navigation.navigateToPage).to.have.been.calledWith(UserDetailsView);
  });

});
