import * as React from 'react';
import { Button, Modal } from 'antd';
import { Hook, Console } from 'console-feed';
import axios from 'axios';
import Launch from '../launch/launch';
import Util from '../util/util';
import File from '../util/file';
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
      (log: any) => this.setState({ logs: [...this.state.logs, log] }),
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

  /**
   * 打开编译窗口
   */
  buildHandle = () => {
    this.setState({ vbuild: true }, () => this.build());
  };

  closeBuildHandle = () => {
    this.setState({ vbuild: false });
  };

  /**
   * 本地编译
   */
  build() {
    const cwd = process.cwd();
    const { project } = this.props;
    const data = {
      name: project.name,
      context: `${cwd}/temp`,
      output: `${cwd}/assets/pkg`
    };
    const temp = `${cwd}/config/temp.config.js`;
    // clean mfconsole
    this.state.logs = [];

    mfconsole.warn('start to build ...');
    const code = File.readFile(`${cwd}/config/build.tpl`);
    File.writeFile(
      temp,
      code.replace(/<%([^%>]*)%>/g, ($, $1) => data[$1])
    );

    Util.shell(
      `
      mkdir -p temp
      cp -r ${project.path}/src/* ./temp
      npx webpack --config ${temp}
      rm -rf ./temp ${temp}
      `
    )
      .then((data) => mfconsole.info(data))
      .catch((e) => mfconsole.error(e));

    // TODO: git push 打包后文件，并推送到线上，同时更新配置服务器内容
  }

  /**
   * 模拟 sleep
   */
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

  /**
   * 部署到远程服务器
   */
  deploy = () => {
    const { project } = this.props;
    this.state.logs = [];

    axios
      .post(project.deploy, { test: 1 })
      .then(async (res) => {
        mfconsole.warn('start to deploy ...');
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
      .catch((e) => {
        mfconsole.error(e.message);
      });
  };

  render() {
    const { project, showLabel } = this.props;
    const { vlaunch, vdeploy, vbuild, logs } = this.state;

    return (
      <div className='mf-select'>
        {showLabel ? (
          <label>
            项目路径: <em>{project.path}</em>
          </label>
        ) : null}
        <Button type='primary' size='small' icon='file' onClick={this.showLaunch}>
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
        <Modal
          className='mf-build-modal'
          visible={vbuild}
          maskClosable={false}
          footer={null}
          title={process.cwd() + '/dist'}
          onCancel={this.closeBuildHandle}>
          <div>
            <Console logs={logs} variant='dark' />
          </div>
        </Modal>
      </div>
    );
  }
}
