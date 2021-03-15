import { User } from '@models/User';
import { colors, fonts, sizes } from '@resources';
import { Separator } from '@views/shared/elements';
import { Composite, LayoutData, Setter, TextView } from 'tabris';
import { Cell, ListView } from 'tabris-decorators';

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
            top: 0,
            stretchX: true,
            font: fonts.listTwoLinePrimary,
            textColor: colors.black
          }),
          TextView({
            id: 'username',
            top: [LayoutData.prev, sizes.spacingXxs],
            stretchX: true,
            font: fonts.listTwoLineSecondary,
            textColor: colors.black
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
