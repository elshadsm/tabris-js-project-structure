import { Attributes, Composite, LayoutData, ScrollView, TextView, Widget, asFactory } from 'tabris';
import { bind, component, injectable, property } from 'tabris-decorators';
import { colors, fonts, sizes } from '@resources';
import { CustomPage, PageArgs } from '@views/shared/CustomPage';
import { capitalize } from '@common/converter';
import { Separator } from '@views/shared/elements';

@injectable({ shared: false })
@component
export class UserDetailsView extends CustomPage {

  constructor([user]: PageArgs) {
    super({ title: user.name });
    this.append(
      ScrollView({
        layoutData: LayoutData.stretch,
        children: this.createContent(user)
      })
    );
  }

  private createContent<T>(data: T): Widget[] {
    const list: Widget[] = [];
    for (const propertyName in data) {
      if (typeof data[propertyName] === 'object') {
        list.push(this.createSeparator());
        list.push(this.createInfoView(capitalize(propertyName), ''));
        list.push(...this.createContent(data[propertyName]));
      } else {
        list.push(this.createInfoView(propertyName, String(data[propertyName])));
      }
    }
    return list;
  }

  private createInfoView(label: string, info: string): InfoView {
    return InfoView({
      left: sizes.spacing,
      top: [LayoutData.prev, sizes.spacing],
      right: sizes.spacing,
      label,
      info
    });
  }

  private createSeparator(): Composite {
    return Separator({
      left: sizes.spacing,
      top: [LayoutData.prev, sizes.spacing],
      right: sizes.spacing
    });
  }

}

@component
class _InfoView extends Composite {

  @property @bind('#label.text') label: string;
  @property @bind('#info.text') info: string;

  constructor(attributes: Attributes<Composite>) {
    super(attributes);
    this.append(
      TextView({
        id: 'label',
        left: 0,
        right: { percent: 75 },
        centerY: 0,
        font: fonts.label,
        textColor: colors.primaryDark
      }),
      TextView({
        id: 'info',
        left: [LayoutData.prev, sizes.spacing],
        right: 0,
        centerY: 0,
        font: fonts.info,
        textColor: colors.black
      }));
  }

}

const InfoView = asFactory(_InfoView);
type InfoView = _InfoView;
