import { LayoutData } from 'tabris';
import { injectable, component, inject, bindAll } from 'tabris-decorators';
import { Label, PrimaryButton } from '@views/shared/elements';
import { MainViewModel } from './MainViewModel';
import { CustomPage } from '@views/shared/CustomPage';
import { sizes, texts } from '@resources';

@injectable({ shared: false })
@component
export class MainView extends CustomPage {

  @inject
  @bindAll({
    label: '#label.text',
    buttonText: '#button.text'
  })
  public model: MainViewModel;

  constructor() {
    super({
      title: texts.mainViewTitle
    });
    this.append(
      Label({
        id: 'label',
        left: sizes.spacing,
        right: sizes.spacing,
        bottom: [LayoutData.next, sizes.spacing]
      }),
      PrimaryButton({
        id: 'button',
        left: sizes.spacing,
        right: sizes.spacing,
        centerY: 0
      })
    );
  }

}
