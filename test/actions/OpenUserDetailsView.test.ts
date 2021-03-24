import { expect, init, reset, stub } from '@sandbox';
import { Injector } from 'tabris-decorators';
import { OpenUserDetailsView } from '@actions/OpenUserDetailsView';
import { UserDetailsView } from '@views/user-details/UserDetailsView';
import { Navigation } from '@services/Navigation';
import { testUsers } from 'testData';

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
    openUserDetailsView = injector.resolve(OpenUserDetailsView);
  });

  afterEach(() => reset());

  it('navigates to UserDetailsView page', () => {
    stub(navigation, 'navigateToPage');

    openUserDetailsView.exec(testUsers[0]);

    expect(navigation.navigateToPage).to.have.been.calledWith(UserDetailsView);
  });

});
