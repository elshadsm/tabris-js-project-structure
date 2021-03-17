import { Composite, LayoutData } from 'tabris';
import { component, injectable, inject, bindAll } from 'tabris-decorators';
import { Label, PrimaryButton, TextField } from '@views/shared/elements';
import { colors, sizes, texts } from '@resources';
import { LockViewModel } from './LockViewModel';
import { Screen } from '@views/shared/Screen';

@injectable({ shared: false })
@component
export class LockView extends Screen {

  @inject
  @bindAll({
    input: '#input.text'
  })
  public model: LockViewModel;

  constructor() {
    super({
      background: {
        colorStops: [colors.secondary, colors.white],
        direction: 315
      }
    });
    this.append(
      Composite({
        left: sizes.spacing,
        right: sizes.spacing,
        centerY: 0,
        padding: sizes.spacing,
        elevation: sizes.spacing,
        cornerRadius: sizes.spacingXs,
        background: colors.white,
        children: [
          Label({
            id: 'label',
            bottom: [LayoutData.next, sizes.spacing],
            layoutData: LayoutData.stretchX,
            text: texts.lockViewLabel
          }),
          TextField({
            id: 'input',
            bottom: [LayoutData.next, sizes.spacingXxl],
            layoutData: LayoutData.stretchX
          }),
          PrimaryButton({
            id: 'button',
            bottom: 0,
            layoutData: LayoutData.stretchX,
            text: texts.login,
            onSelect: () => this.model.login()
          })
        ]
      })
    );
  }

}
