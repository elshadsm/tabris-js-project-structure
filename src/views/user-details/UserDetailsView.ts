import { Composite, LayoutData, Properties, ScrollView, TextView, Widget } from 'tabris';
import { bind, component, property, shared } from 'tabris-decorators';
import { colors, fonts, sizes, texts } from '@resources';
import { EmptyView, Separator } from '@views/shared/elements';
import { CustomPage } from '@views/shared/CustomPage';
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
          ...this.createInfoSection(texts.user, this.user),
          Separator({
            left: sizes.spacing,
            top: [LayoutData.prev, sizes.spacing],
            right: sizes.spacing
          }),
          ...this.createInfoSection(texts.address, this.user.address),
          Separator({
            left: sizes.spacing,
            top: [LayoutData.prev, sizes.spacing],
            right: sizes.spacing
          }),
          ...this.createInfoSection(texts.geo, this.user.address.geo),
          Separator({
            left: sizes.spacing,
            top: [LayoutData.prev, sizes.spacing],
            right: sizes.spacing
          }),
          ...this.createInfoSection(texts.company, this.user.company),
          EmptyView({ top: LayoutData.prev })
        ]
      })
    );
  }

  private createInfoSection(label: string, info: Model): Widget[] {
    const list: Widget[] = [
      new TextView({
        left: sizes.spacing,
        top: [LayoutData.prev, sizes.spacing],
        right: sizes.spacing,
        text: label,
        font: fonts.header,
        textColor: colors.black
      })];
    for (const propertyName in info) {
      const key = propertyName as keyof Model;
      const value = info[key];
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
