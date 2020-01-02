import * as React from 'react';
import { Button, Modal } from 'antd';
import { Hook, Console } from 'console-feed';
import axios from 'axios';
import Launch from '../launch/launch';
import './operate.less';

/**
 * @file 项目选择组件
 */

const fg = require('fast-glob');
const fs = require('fs');
let mfconsole;

export default class Operate extends React.Component<any, any> {
  static getDerivedStateFromProps(props, state) {
    return {
      vlaunch: props.showLaunch || state.vlaunch,
      vdeploy: state.vdeploy,
      vbuild: state.vbuild,
      logs: state.logs
    };
  }

  state = {
    vlaunch: false,
    vdeploy: false,
    vbuild: false,
    logs: []
  };

  componentDidMount() {
    mfconsole = Hook(
      Object.assign({}, window.console),
      log => this.setState({ logs: [...this.state.logs, log] }),
      false
    );
  }

  showLaunch = () => {
    this.setState({ vlaunch: true });
  };

  hideLaunch = () => {
    this.setState({ vlaunch: false });
  };

  /**
   * 打开部署窗口
   */
  deployHandle = () => {
    this.setState({ vdeploy: true }, () => this.deploy());
  };

  closeDeployHandle = () => {
    this.setState({ vdeploy: false });
  };

  buildHandle = () => {
    Modal.warn({ title: 'todo' });
  };

  closeBuildHandle = () => {
    this.setState({ vbuild: false });
  };

  lazy(time) {
    return new Promise(function(resolve, reject) {
      const tid = setTimeout(function() {
        reject();
      }, time + 1000);

      setTimeout(function() {
        clearTimeout(tid);
        resolve();
      }, time);
    });
  }

  deploy = () => {
    const { project } = this.props;

    axios
      .post(project.deploy, { test: 1 })
      .then(async res => {
        mfconsole.log('start to deploy ...');
        await this.lazy(1000);
        mfconsole.log('deploy server connected ...');

        const list = fg.sync(`${project.path}/src/**.(js|jsx|less|css|ts|tsx)`);
        let hasPkg = false;

        if (!list.length) {
          return mfconsole.error('empty project');
        }

        for (let i = 0; i < list.length; i++) {
          const file = list[i];

          if (/pkg\.js/.test(file)) {
            hasPkg = true;
          }

          try {
            const data = new FormData();
            data.append('name', project.name);
            data.append('filePath', file);
            data.append('file', new Blob(fs.readFileSync(file)));

            const ret: any = await axios.post(project.deploy, data, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });
            mfconsole.info('deploy:', `${file} -> ${ret.data.to}`);
          } catch (e) {
            mfconsole.error(e.message);
            break;
          }
        }

        if (!hasPkg) {
          mfconsole.warn('缺少 pkg 入口文件, 插件将无法启动');
        } else {
          this.closeDeployHandle();
        }
      })
      .catch(e => {
        mfconsole.error(e.message);
      });
  };

  render() {
    const { project, showLabel } = this.props;
    const { vlaunch, vdeploy, logs } = this.state;

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
        <Button type='primary' size='small' icon='play-circle' onClick={this.buildHandle}>
          构建
        </Button>
        <Modal className='mf-launch-modal' closable={false} visible={vlaunch} footer={null}>
          <Launch onHide={this.hideLaunch} />
        </Modal>
        <Modal
          className='mf-build-modal'
          visible={vdeploy}
          maskClosable={false}
          footer={null}
          title={project.deploy}
          onCancel={this.closeDeployHandle}>
          <div>
            <Console logs={logs} variant='dark' />
          </div>
        </Modal>
      </div>
    );
  }
}
