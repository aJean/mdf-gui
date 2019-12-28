import * as React from 'react';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import './menu.less';

/**
 * @file context menu
 */

export default class MfMenu extends React.Component {
  state = {
    path: null
  };

  clickHandle = (elem, data) => {
    console.log(data);
  };

  showHandle = (...args) => {};

  onContextMenu = e => {
    const elem = e.target;
    const path = elem.getAttribute('data-path');
    this.state.path = path;

    if (!path) {
      e.stopPropagation();
    }
  };

  render() {
    const { children } = this.props;
    const parent = React.cloneElement(children as React.ReactElement, {
      onContextMenu: this.onContextMenu
    });

    return (
      <div className='mf-contextmenu'>
        <ContextMenuTrigger id='mf-contextmenu-id'>{parent}</ContextMenuTrigger>

        <ContextMenu id='mf-contextmenu-id' onShow={this.showHandle}>
          <MenuItem data={{ type: 'finder' }} onClick={this.clickHandle}>
            在 Finder 中显示
          </MenuItem>
          <MenuItem data={{ type: 'code' }} onClick={this.clickHandle}>
            在编辑器中打开
          </MenuItem>
          <MenuItem data={{ type: 'iterm' }} onClick={this.clickHandle}>
            在终端中打开
          </MenuItem>
          <MenuItem divider />
          <MenuItem data={{ type: 'add' }} onClick={this.clickHandle}>
            新建文件
          </MenuItem>
          <MenuItem data={{ type: 'rename' }} onClick={this.clickHandle}>
            重命名
          </MenuItem>
          <MenuItem divider />
          <MenuItem data={{ type: 'del' }} onClick={this.clickHandle}>
            删除
          </MenuItem>
        </ContextMenu>
      </div>
    );
  }
}
