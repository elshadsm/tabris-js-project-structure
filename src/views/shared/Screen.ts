/* eslint-disable @typescript-eslint/no-explicit-any */

import { Composite, Attributes, LayoutData } from 'tabris';
import { colors } from '@resources';

export abstract class Screen extends Composite {

  readonly model: {
    init?: () => unknown,
    dispose?: () => unknown
  };

  constructor(attributes?: Attributes<Screen>) {
    super({
      layoutData: LayoutData.stretch,
      background: colors.background,
      ...attributes
    });
  }

}

export type ScreenArgs = any[];
