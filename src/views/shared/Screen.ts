import { Composite, LayoutData, Properties } from 'tabris';
import { colors } from '@resources';

/**
 * Top-level container that does not include toolbar and is not affected by back navigation event of the device.
 * It is recommended to use as blocking UIs. For example as a lock screen, etc.
 */
export abstract class Screen extends Composite {

  constructor(properties?: Properties<Screen>) {
    super({
      layoutData: LayoutData.stretch,
      background: colors.background,
      ...properties
    });
  }

}
