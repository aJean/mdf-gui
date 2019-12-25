import * as React from 'react';
import Util from '../util/util';
import './status.less';

/**
 * @file 状态栏
 */

const PubSub = require('pubsub-js');
export default class Status extends React.PureComponent<any, any> {
  state = {
    codeStatus: 'normal'
  };

  componentDidMount() {
    // out of react transaction
    PubSub.subscribe('code-edit', () => {
      if (this.state.codeStatus == 'normal') {
        this.setState({ codeStatus: 'edit' });
        console.log(2);
      }
    });
    PubSub.subscribe('code-save', () => this.setState({ codeStatus: 'normal' }));
    PubSub.subscribe('code-load', () => this.setState({ codeStatus: 'normal' }));
  }

  componentWillUnmount() {
    PubSub.clearAllSubscriptions();
  }

  render() {
    const { project, file } = this.props;
    const { codeStatus } = this.state;

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
          {codeStatus == 'edit' ? <span className='mf-status-todo'></span> : null}
        </div>
        <div className='mf-status-type'>
          <em>UTF-8</em>
          <span>{type}</span>
        </div>
      </div>
    );
  }
}
