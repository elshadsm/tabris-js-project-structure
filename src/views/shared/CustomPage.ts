import { Page, Properties } from 'tabris';
import { colors } from '@resources';

/**
 * A container representing a single page of a NavigationView component.
 */
export abstract class CustomPage extends Page {

  constructor(properties?: Properties<CustomPage>) {
    super({
      background: colors.background,
      ...properties
    });
  }

}

export type PageArgs<T extends CustomPage> = Partial<Properties<T>>;
