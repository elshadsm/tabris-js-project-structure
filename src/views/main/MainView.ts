import { LayoutData } from 'tabris';
import { bindAll, component, injectable, inject, ListView } from 'tabris-decorators';
import { MainViewModel } from './MainViewModel';
import { sizes, texts } from '@resources';
import { CustomPage } from '@views/shared/CustomPage';
import { UserCell } from './UserCell';
import { Message } from '@views/shared/elements';
import { User } from '@models/User';

@injectable({ shared: false })
@component
export class MainView extends CustomPage {

  @inject
  @bindAll({
    message: '#message.text',
    userList: '#listView.items'
  })
  public model: MainViewModel;

  constructor() {
    super({
      title: texts.mainViewTitle
    });
    this.append(
      Message({
        id: 'message',
        left: sizes.spacing,
        right: sizes.spacing,
        centerY: 0,
        alignment: 'centerX'
      }),
      ListView<User>({
        id: 'listView',
        layoutData: LayoutData.stretch,
        cellHeight: sizes.listTwoLineItemHeight,
        createCell: () => UserCell(),
        onSelect: ({ item }) => this.model.select(item)
      })
    );
  }

}
