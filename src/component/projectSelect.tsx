import * as React from 'react';
import { Button } from 'antd';
import './projectSelect.less';

/**
 * @file 项目选择组件
 */

export default class ProjectSelect extends React.Component<any, any> {
  clickHandle = () => {
    const { changeRouter } = this.props;
    changeRouter && changeRouter('/');
  };

  render() {
    const { path } = this.props;
    return (
      <div className='mf-select'>
        <label>
          项目路径: <em>{path}</em>
        </label>
        <Button type='primary' icon="file" size="small" onClick={this.clickHandle}>
          切换
        </Button>
      </div>
    );
  }
}
