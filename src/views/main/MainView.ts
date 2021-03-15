import { LayoutData } from 'tabris';
import { injectable, component, inject, bindAll, ListView } from 'tabris-decorators';
import { Message } from '@views/shared/elements';
import { MainViewModel } from './MainViewModel';
import { CustomPage } from '@views/shared/CustomPage';
import { sizes, texts } from '@resources';
import { User } from '@models/User';
import { UserCell } from './UserCell';

@injectable({ shared: false })
@component
export class MainView extends CustomPage {

  @inject
  @bindAll({
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
        centerY: 0
      }),
      ListView<User>({
        id: 'listView',
        layoutData: LayoutData.stretch,
        cellHeight: sizes.listTwoLineItemHeight,
        createCell: () => UserCell(),
        onSelect: ({item}) => this.model.select(item)
      })
    );
  }

}
