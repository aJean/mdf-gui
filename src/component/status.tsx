import * as React from 'react';
import Util from '../util/util';
import './status.less';

/**
 * @file 状态栏
 */

export default class Status extends React.PureComponent<any, any> {
  render() {
    const { path } = this.props;
    const res = path ? Util.parseFile(path) : { type: '--' };

    return (
      <div className='mf-status'>
        <div className='mf-status-file'>{path}</div>
        <div className='mf-status-type'>UTF-8 {res.type}</div>
      </div>
    );
  }
}
