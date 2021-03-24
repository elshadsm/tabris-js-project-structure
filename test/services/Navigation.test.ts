import { expect, init, reset } from '@sandbox';
import { contentView, NavigationView, Properties } from 'tabris';
import { Injector, property } from 'tabris-decorators';
import { CustomPage } from '@views/shared/CustomPage';
import { Navigation } from '@services/Navigation';
import { testUsers } from 'testData';
import { Screen } from '@views/shared/Screen';
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

      navigation.navigateToScreen(TestScreen, { user, id: 'foo' });

      const screen = contentView.children().last() as TestScreen;
      expect(screen.user).to.deep.equal(user);
      expect(screen.id).to.equal('foo');
    });

    it('disposes current screen', () => {
      const user = testUsers[0];

      navigation.navigateToScreen(TestScreen, { user, id: 'foo' });
      navigation.navigateToScreen(TestScreen, { user, id: 'bar' });

      const currentScreen = contentView.find('#foo').first() as TestScreen;
      const newScreen = contentView.find('#bar').first() as TestScreen;
      expect(currentScreen).to.be.undefined;
      expect(newScreen.isDisposed()).to.be.false;
    });

  });

  describe('navigateToPage', () => {

    it('navigates to TestPage', () => {
      const user = testUsers[0];

      navigation.navigateToPage(TestPage, { user, id: 'foo' });

      const navigationView = contentView.find(NavigationView).first();
      const page = navigationView.pages().last() as TestPage;
      expect(page.user).to.deep.equal(user);
      expect(page.id).to.equal('foo');
    });

    it('keeps current page', () => {
      const user = testUsers[0];

      navigation.navigateToPage(TestPage, { user, id: 'foo' });
      navigation.navigateToPage(TestPage, { user, id: 'bar' });

      const navigationView = contentView.find(NavigationView).first();
      const currentPage = navigationView.find('#foo').first() as TestPage;
      const newPage = navigationView.find('#bar').first() as TestPage;
      expect(currentPage.isDisposed()).to.be.false;
      expect(newPage.isDisposed()).to.be.false;
    });

    it('disposes current screen', () => {
      const user = testUsers[0];

      navigation.navigateToScreen(TestScreen, { user, id: 'foo' });
      navigation.navigateToPage(TestPage, { user, id: 'bar' });

      const navigationView = contentView.find(NavigationView).first();
      const currentScreen = contentView.find('#foo').first() as TestScreen;
      const newPage = navigationView.find('#bar').first() as TestPage;
      expect(currentScreen).to.be.undefined;
      expect(newPage.isDisposed()).to.be.false;
    });

  });

});

class TestScreen extends Screen {

  @property user: User;

  constructor(properties: Properties<TestScreen>) {
    super(properties);
  }

}

class TestPage extends CustomPage {

  @property user: User;

  constructor(properties: Properties<TestScreen>) {
    super(properties);
  }

}
