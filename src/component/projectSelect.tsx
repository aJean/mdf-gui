import * as React from 'react';
import { Button } from 'antd';
import FileTools from '../util/file';
import './projectSelect.less';
const remote = require('electron').remote;

/**
 * @file 项目选择组件
 */

export default class ProjectSelect extends React.Component<any, any> {
  clickHandle = e => {
    const { dispatch, path } = this.props;

    const files = remote.dialog
      .showOpenDialog({
        buttonLabel: '选择',
        defaultPath: path,
        properties: ['openDirectory']
      })
      .then(res => {
        const filePaths = res.filePaths;

        if (filePaths && filePaths.length) {
          const path = filePaths[0];
          const project = this.saveProject(path);

          if (project && dispatch) {
            dispatch(project);
          }
        }
      });
  };

  /**
   * 保存选择的项目信息
   */
  saveProject(path) {
    const name = path.split('/').pop();
    const project = { name, path };
    
    return FileTools.writeConfig(JSON.stringify(project)) && project;
  }

  render() {
    const { path } = this.props;
    return (
      <div className='project-select'>
        <label>
          项目路径: <em>{path}</em>
        </label>
        <Button type='primary' onClick={this.clickHandle}>
          重新选择
        </Button>
      </div>
    );
  }
}
