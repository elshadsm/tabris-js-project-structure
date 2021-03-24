import { Composite, LayoutData, Properties, ScrollView, TextView, Widget } from 'tabris';
import { bind, component, property, shared } from 'tabris-decorators';
import { CustomPage, PageArgs } from '@views/shared/CustomPage';
import { colors, fonts, sizes } from '@resources';
import { capitalize } from '@common/converter';
import { Separator } from '@views/shared/elements';
import { User } from '@models/User';

@shared
@component
export class UserDetailsView extends CustomPage {

  @property user: User;

  constructor(args: PageArgs<UserDetailsView>) {
    super({
      title: args.user.name,
      ...args
    });
    this.append(
      ScrollView({
        layoutData: LayoutData.stretch,
        children: this.createContent(this.user)
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
    return new InfoView({
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
class InfoView extends Composite {

  @bind('#label.text') label: string;
  @bind('#info.text') info: string;

  constructor(properties: Properties<InfoView>) {
    super(properties);
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
