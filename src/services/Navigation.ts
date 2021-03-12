/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavigationView, contentView, LayoutData } from 'tabris';
import { create } from 'tabris-decorators';
import { CustomPage } from '@views/shared/CustomPage';
import { Screen } from '@views/shared/Screen';
import { colors } from '@resources';
import { shared } from 'tabris-decorators';

@shared
export class Navigation {

  private currentScreen: Screen = null;

  private readonly pageNavigation = new NavigationView({
    layoutData: LayoutData.stretch,
    toolbarColor: colors.primaryDark,
    titleTextColor: colors.white,
    actionColor: colors.white,
    actionTextColor: colors.white,
    background: colors.primary
  }).appendTo(contentView);

  public navigateToScreen(Name: new () => Screen, ...args: any[]): void {
    const newScreen = create(Name, args);
    contentView.append(newScreen);
    this.disposeCurrentScreen();
    this.currentScreen = newScreen;
  }

  public navigateToPage(Name: new () => CustomPage, ...args: any[]): void {
    this.pageNavigation.append(create(Name, args));
    this.disposeCurrentScreen();
  }

  private disposeCurrentScreen(): void {
    if (this.currentScreen) {
      this.currentScreen.dispose();
      this.currentScreen = null;
    }
  }

}
