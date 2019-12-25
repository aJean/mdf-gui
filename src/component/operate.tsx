import * as React from 'react';
import { message, Button } from 'antd';
import './operate.less';

/**
 * @file 项目选择组件
 */

export default class Operate extends React.Component<any, any> {
  clickHandle = () => {
    const { changeRouter } = this.props;
    changeRouter && changeRouter('/');
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
        <Button type='primary' icon='file' size='small' onClick={this.clickHandle}>
          切换
        </Button>
        <Button type='primary' size='small' icon='play-circle' onClick={this.deployHandle}>
          部署
        </Button>
        <Button type='primary' size='small' icon='play-circle' onClick={this.deployHandle}>
          构建
        </Button>
      </div>
    );
  }
}
