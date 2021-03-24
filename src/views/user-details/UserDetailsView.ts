import { Composite, LayoutData, Properties, ScrollView, TextView, Widget } from 'tabris';
import { bind, component, property, shared } from 'tabris-decorators';
import { colors, fonts, sizes, texts } from '@resources';
import { CustomPage } from '@views/shared/CustomPage';
import { Separator } from '@views/shared/elements';
import { Model } from '@models/index';
import { User } from '@models/User';

@shared
@component
export class UserDetailsView extends CustomPage {

  @property user: User;

  constructor(properties: Properties<UserDetailsView>) {
    super({
      title: properties.user.name,
      ...properties
    });
    this.append(
      ScrollView({
        layoutData: LayoutData.stretch,
        children: [
          ...this.createInfoUi(this.user),
          Separator({
            left: sizes.spacing,
            top: [LayoutData.prev, sizes.spacing],
            right: sizes.spacing
          }),
          new InfoView({
            left: sizes.spacing,
            top: [LayoutData.prev, sizes.spacing],
            right: sizes.spacing,
            label: texts.address,
            info: ''
          }),
          ...this.createInfoUi(this.user.address),
          Separator({
            left: sizes.spacing,
            top: [LayoutData.prev, sizes.spacing],
            right: sizes.spacing
          }),
          new InfoView({
            left: sizes.spacing,
            top: [LayoutData.prev, sizes.spacing],
            right: sizes.spacing,
            label: texts.geo,
            info: ''
          }),
          ...this.createInfoUi(this.user.address.geo),
          Separator({
            left: sizes.spacing,
            top: [LayoutData.prev, sizes.spacing],
            right: sizes.spacing
          }),
          new InfoView({
            left: sizes.spacing,
            top: [LayoutData.prev, sizes.spacing],
            right: sizes.spacing,
            label: texts.company,
            info: ''
          }),
          ...this.createInfoUi(this.user.company)
        ]
      })
    );
  }

  private createInfoUi(model: Model): Widget[] {
    const list: Widget[] = [];
    for (const propertyName in model) {
      const key = propertyName as keyof Model;
      const value = model[key];
      if (typeof value !== 'object') {
        list.push(
          new InfoView({
            left: sizes.spacing,
            top: [LayoutData.prev, sizes.spacing],
            right: sizes.spacing,
            label: key,
            info: String(value)
          }));
      }
    }
    return list;
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
