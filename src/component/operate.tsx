import * as React from 'react';
import { message, Button, Modal } from 'antd';
import Launch from '../launch/launch';
import './operate.less';

/**
 * @file 项目选择组件
 */

const cmd = require('node-cmd');
export default class Operate extends React.Component<any, any> {
  static getDerivedStateFromProps(props, state) {
    return {
      vlaunch: props.showLaunch || state.vlaunch,
      vbuild: state.vbuild
    };
  }

  state = {
    vlaunch: false,
    vbuild: true
  };

  showLaunch = () => {
    this.setState({ vlaunch: true });
  };

  hideLaunch = () => {
    this.setState({ vlaunch: false });
  };

  deployHandle = () => {
    Modal.warn({ title: 'todo' });
  };

  test = () => {
    const iterm: any = this.refs.iterm;
    console.log(iterm);

    cmd.get('ls', function(err, data, stderr) {
      iterm.innerHTML = data;
    });
  };

  closeBuildHandle = () => {
    this.setState({ vbuild: false });
  };

  render() {
    const { project, showLabel } = this.props;
    const { vlaunch, vbuild } = this.state;

    return (
      <div className='mf-select'>
        {showLabel ? (
          <label>
            项目路径: <em>{project.path}</em>
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
        <Modal className='mf-launch-modal' closable={false} visible={vlaunch} footer={null}>
          <Launch onHide={this.hideLaunch} />
        </Modal>
        <Modal
          className='mf-build-modal'
          visible={vbuild}
          maskClosable={false}
          footer={null}
          title='传输中...'
          onCancel={this.closeBuildHandle}>
          <div>
            <button onClick={this.test}>click me</button>
            <pre ref='iterm'></pre>
          </div>
        </Modal>
      </div>
    );
  }
}
