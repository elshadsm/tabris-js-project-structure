/* eslint-disable @typescript-eslint/no-explicit-any */
import { Page, Attributes } from 'tabris';
import { colors } from '@resources';

export abstract class CustomPage extends Page {

  readonly model: {
    init?: () => unknown,
    dispose?: () => unknown
  };

  constructor(attributes?: Attributes<CustomPage>) {
    super({
      background: colors.background,
      ...attributes
    });
    this.model?.init();
  }

}

export type PageArgs = any[];
