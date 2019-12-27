import * as React from 'react';
import { message, Button, Modal } from 'antd';
import Launch from '../Launch/launch';
import './operate.less';

/**
 * @file 项目选择组件
 */

export default class Operate extends React.Component<any, any> {
  state = {
    visible: false
  };

  showLaunch = () => {
    this.setState({ visible: true });
  };

  hideLaunch = () => {
    this.setState({ visible: false });
  };

  deployHandle = () => {
    message.warning('todo...');
  };

  render() {
    const { path, showLabel } = this.props;
    return (
      <div className='mf-select'>
        {showLabel ? (
          <label>
            项目路径: <em>{path}</em>
          </label>
        ) : null}
        <Button type='primary' icon='file' size='small' onClick={this.showLaunch}>
          切换
        </Button>
        <Button type='primary' size='small' icon='play-circle' onClick={this.deployHandle}>
          部署
        </Button>
        <Button type='primary' size='small' icon='play-circle' onClick={this.deployHandle}>
          构建
        </Button>
        <Modal
          closable={false}
          style={{ top: 0 }}
          bodyStyle={{ padding: 0 }}
          visible={this.state.visible}
          footer={null}>
          <Launch onHide={this.hideLaunch} />
        </Modal>
      </div>
    );
  }
}
