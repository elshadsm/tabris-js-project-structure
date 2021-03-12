import { LayoutData } from 'tabris';
import { injectable, component, inject, bindAll } from 'tabris-decorators';
import { Label, PrimaryButton, TextField } from '@views/shared/elements';
import { LockViewModel } from './LockViewModel';
import { sizes, texts } from '@resources';
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
    super();
    this.append(
      Label({
        id: 'label',
        left: sizes.spacing,
        right: sizes.spacing,
        bottom: [LayoutData.next, sizes.spacing],
        text: texts.lockViewLabel
      }),
      TextField({
        id: 'input',
        left: sizes.spacing,
        right: sizes.spacing,
        centerY: 0
      }),
      PrimaryButton({
        id: 'button',
        left: sizes.spacing,
        right: sizes.spacing,
        bottom: sizes.spacing,
        text: texts.login,
        onSelect: () => this.model.login()
      })
    );
  }

}
