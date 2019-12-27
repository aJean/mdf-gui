import * as React from 'react';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import './menu.less';

/**
 * @file context menu
 */

export default class MfMenu extends React.Component {
  clickHandle = (elem, data) => {
    console.log(data)
  };

  showHandle = (...args) => {
    console.log(args)
  }

  render() {
    const { children } = this.props;
    const parent = React.cloneElement(children as React.ReactElement, {
      onContextMenu: function(e) {
        console.log(e.target)
      }
    });

    return (
      <div className='mf-contextmenu'>
        <ContextMenuTrigger id='mf-contextmenu-id'>{parent}</ContextMenuTrigger>

        <ContextMenu id='mf-contextmenu-id' onShow={this.showHandle}>
          <MenuItem data={{ foo: 'bar' }} onClick={this.clickHandle}>
            在 Finder 中显示
          </MenuItem>
          <MenuItem data={{ foo: 'bar' }} onClick={this.clickHandle}>
            在编辑器中打开
          </MenuItem>
          <MenuItem data={{ foo: 'bar' }} onClick={this.clickHandle}>
            在终端中打开
          </MenuItem>
          <MenuItem divider />
          <MenuItem data={{ foo: 'bar' }} onClick={this.clickHandle}>
            新建文件
          </MenuItem>
          <MenuItem data={{ foo: 'bar' }} onClick={this.clickHandle}>
            重命名
          </MenuItem>
          <MenuItem divider />
          <MenuItem data={{ foo: 'bar' }} onClick={this.clickHandle}>
            删除
          </MenuItem>
        </ContextMenu>
      </div>
    );
  }
}
