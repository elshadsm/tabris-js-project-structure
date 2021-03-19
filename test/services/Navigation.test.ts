import { expect, init, reset } from '@sandbox';
import { contentView, NavigationView } from 'tabris';
import { Injector } from 'tabris-decorators';
import { CustomPage, PageArgs } from '@views/shared/CustomPage';
import { Screen, ScreenArgs } from '@views/shared/Screen';
import { Navigation } from '@services/Navigation';
import { testUsers } from 'testData';
import { User } from '@models/User';

describe('Navigation', () => {

  let injector: Injector;
  let navigation: Navigation;

  beforeEach(() => {
    init();
    injector = new Injector();
    injector.shared(Navigation);
    navigation = injector.resolve(Navigation);
  });

  afterEach(() => reset());

  describe('navigateToScreen', () => {

    it('navigates to TestScreen', () => {
      const user = testUsers[0];

      navigation.navigateToScreen(TestScreen, user, 'foo');

      const screen = contentView.children().last() as TestScreen;
      expect(screen.user).to.deep.equal(user);
      expect(screen.id).to.equal('foo');
    });

    it('disposes current screen', () => {
      const user = testUsers[0];

      navigation.navigateToScreen(TestScreen, user, 'foo');
      navigation.navigateToScreen(TestScreen, user, 'bar');

      const currentScreen = contentView.find('#foo').first() as TestScreen;
      const newScreen = contentView.find('#bar').first() as TestScreen;
      expect(currentScreen).to.be.undefined;
      expect(newScreen.isDisposed()).to.be.false;
    });

  });

  describe('navigateToPage', () => {

    it('navigates to TestPage', () => {
      const user = testUsers[0];

      navigation.navigateToPage(TestPage, user, 'foo');

      const navigationView = contentView.find(NavigationView).first();
      const page = navigationView.pages().last() as TestPage;
      expect(page.user).to.deep.equal(user);
      expect(page.id).to.equal('foo');
    });

    it('keeps current page', () => {
      const user = testUsers[0];

      navigation.navigateToPage(TestPage, user, 'foo');
      navigation.navigateToPage(TestPage, user, 'bar');

      const navigationView = contentView.find(NavigationView).first();
      const currentPage = navigationView.find('#foo').first() as TestPage;
      const newPage = navigationView.find('#bar').first() as TestPage;
      expect(currentPage.isDisposed()).to.be.false;
      expect(newPage.isDisposed()).to.be.false;
    });

    it('disposes current screen', () => {
      const user = testUsers[0];

      navigation.navigateToScreen(TestScreen, user, 'foo');
      navigation.navigateToPage(TestPage, user, 'bar');

      const navigationView = contentView.find(NavigationView).first();
      const currentScreen = contentView.find('#foo').first() as TestScreen;
      const newPage = navigationView.find('#bar').first() as TestPage;
      expect(currentScreen).to.be.undefined;
      expect(newPage.isDisposed()).to.be.false;
    });

  });

});

class TestScreen extends Screen {

  user: User;

  constructor([user, id]: ScreenArgs) {
    super({ id })
    this.user = user;
  }

}

class TestPage extends CustomPage {

  user: User;

  constructor([user, id]: PageArgs) {
    super({ id })
    this.user = user;
  }

}
