import * as React from 'react';
import Util from '../util/util';
import './status.less';

/**
 * @file 状态栏
 */

export default class Status extends React.PureComponent<any, any> {
  render() {
    const { project, file } = this.props;
    let type = '--';
    let path = '--';

    if (file) {
      path = file.path;
      type = Util.getFileType(path);
    }

    return (
      <div className='mf-status'>
        <div className='mf-status-file'>
          <img src='/assets/logos/status-logo.svg' />
          <em>{project.name}</em>
          <span>{path}</span>
        </div>
        <div className='mf-status-type'>
          <em>UTF-8</em>
          <span>{type}</span>
        </div>
      </div>
    );
  }
}
