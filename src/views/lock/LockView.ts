import { Composite, LayoutData } from 'tabris';
import { component, inject, shared, bindAll } from 'tabris-decorators';
import { Label, PrimaryButton, TextField } from '@views/shared/elements';
import { colors, sizes, texts } from '@resources';
import { LockViewModel } from './LockViewModel';
import { Screen } from '@views/shared/Screen';

@shared
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
        colorStops: [colors.indigo900, colors.indigo50],
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
