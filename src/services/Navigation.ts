import { Constructor, LayoutData, NavigationView, contentView } from 'tabris';
import { shared } from 'tabris-decorators';
import { CustomPage, PageArgs } from '@views/shared/CustomPage';
import { Screen, ScreenArgs } from '@views/shared/Screen';
import { colors } from '@resources';

@shared
export class Navigation {

  private currentScreen: Screen = null;

  private readonly navigationView = new NavigationView({
    layoutData: LayoutData.stretch,
    toolbarColor: colors.primaryDark,
    titleTextColor: colors.white,
    actionColor: colors.white,
    actionTextColor: colors.white,
    background: colors.primary
  }).appendTo(contentView);

  public navigateToScreen<T extends Screen>(Name: Constructor<T>, args?: ScreenArgs<T>): void {
    const newScreen = new Name(args);
    contentView.append(newScreen);
    this.currentScreen?.dispose();
    this.currentScreen = newScreen;
  }

  public navigateToPage<T extends CustomPage>(Name: Constructor<T>, args?: PageArgs<T>): void {
    this.navigationView.append(new Name(args));
    this.currentScreen?.dispose();
  }

}
