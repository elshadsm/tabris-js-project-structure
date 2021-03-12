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
    this.model?.init();
  }

}
