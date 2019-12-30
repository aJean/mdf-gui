import * as React from 'react';
import { findDOMNode } from 'react-dom';
import { Modal, Input } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import action from '../home/action';
import File from '../util/file';
import './menu.less';

/**
 * @file context menu
 */

class MfMenu extends React.Component<any, any> {
  state = {
    path: null,
    visible: false,
    pos: null,
    action: null
  };

  clickHandle = (elem, data) => {
    console.log(data);
  };

  /**
   * 添加文件
   */
  addHandle = (elem, data) => {
    this.setState({ visible: true, action: data.type });
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  hideModal = () => {
    this.setState({ visible: false, action: null });
  };

  /**
   * 处理 add 指令
   */
  doAddHandle = () => {
    let { path, action } = this.state;
    const node: any = findDOMNode(this.refs.finput);
    const name = node.value.replace(/\s/g, '');

    if (!name) {
      return this.hideModal();
    }

    const flag = action == 'add1' ? 1 : 2;
    // 如果点击的是文件，修复 path
    if (/[^.]+\.[a-zA-Z]+/.test(path)) {
      path = path.replace(/[^./]+\..+/, '');
    }

    path = path.replace('/$', '');
    const res = File.mknew(`${path}/${name}`, flag);

    if (res.code == -1) {
      Modal.error({ title: res.msg });
    } else {
      this.refreshExplore();
      this.hideModal();
    }
  };

  /**
   * 删除文件 & 目录
   */
  delHandle = () => {
    const { path } = this.state;
    const res = File.rm(path);

    if (res.code == -1) {
      Modal.error({ title: res.msg });
    } else {
      this.refreshExplore();
    }
  };

  /**
   * 前插右键事件
   */
  onContextMenu = e => {
    const state = this.state;
    const elem = e.target;
    const path = elem.getAttribute('data-path');
    state.path = path;
    state.pos = { left: e.clientX, top: e.clientY };

    if (!path) {
      e.stopPropagation();
    }
  };

  refreshExplore() {
    const { initFileAction, project } = this.props;
    initFileAction(project.path);
  }

  render() {
    const { children } = this.props;
    const { pos, visible } = this.state;
    const parent = React.cloneElement(children as React.ReactElement, {
      onContextMenu: this.onContextMenu
    });

    return (
      <div className='mf-contextmenu'>
        <ContextMenuTrigger id='mf-contextmenu-id'>{parent}</ContextMenuTrigger>

        <ContextMenu id='mf-contextmenu-id'>
          <MenuItem data={{ type: 'finder' }} onClick={this.clickHandle} disabled>
            在 Finder 中显示
          </MenuItem>
          <MenuItem data={{ type: 'code' }} onClick={this.clickHandle}>
            在编辑器中打开
          </MenuItem>
          <MenuItem data={{ type: 'iterm' }} onClick={this.clickHandle} disabled>
            在终端中打开
          </MenuItem>
          <MenuItem divider />
          <MenuItem data={{ type: 'add1' }} onClick={this.addHandle}>
            新建文件
          </MenuItem>
          <MenuItem data={{ type: 'add2' }} onClick={this.addHandle}>
            新建目录
          </MenuItem>
          <MenuItem data={{ type: 'rename' }} onClick={this.clickHandle} disabled>
            重命名
          </MenuItem>
          <MenuItem divider />
          <MenuItem data={{ type: 'del' }} onClick={this.delHandle}>
            删除
          </MenuItem>
        </ContextMenu>
        <Modal
          className='mf-filemodal'
          style={pos}
          closable={false}
          visible={visible}
          onOk={this.doAddHandle}
          onCancel={this.hideModal}
          mask={false}>
          <Input ref='finput' />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    project: state.project
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initFileAction: bindActionCreators(action.initFile, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MfMenu);
