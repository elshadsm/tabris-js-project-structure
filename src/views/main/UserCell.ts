import { Composite, ImageView, LayoutData, Setter, TextView } from 'tabris';
import { Cell, ListView } from 'tabris-decorators';
import { colors, fonts, images, sizes } from '@resources';
import { Separator } from '@views/shared/elements';
import { User } from '@models/User';

export const UserCell = (): Cell<User> =>
  Cell<User>({
    itemType: User,
    highlightOnTouch: true,
    onTap: ListView.select,
    apply: ({ item }) => [
      Setter(TextView, '#name', { text: item?.name || '' }),
      Setter(TextView, '#username', { text: item?.username || '' })
    ],
    children: [
      Composite({
        left: sizes.spacing,
        right: sizes.spacing,
        centerY: 0,
        children: [
          TextView({
            id: 'name',
            left: 0,
            top: 0,
            right: ['#icon', sizes.spacingXs],
            font: fonts.listTwoLinePrimary,
            textColor: colors.black
          }),
          TextView({
            id: 'username',
            left: 0,
            top: [LayoutData.prev, sizes.spacingXxs],
            right: ['#icon', sizes.spacingXs],
            font: fonts.listTwoLineSecondary,
            textColor: colors.black
          }),
          ImageView({
            id: 'icon',
            right: 0,
            width: sizes.iconSize,
            height: sizes.iconSize,
            centerY: 0,
            image: images.open
          })
        ]
      }),
      Separator({
        left: sizes.spacing,
        right: sizes.spacing,
        bottom: 0
      })
    ]
  });
