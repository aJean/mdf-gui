import * as React from 'react';
import Util from '../util/util';
import './status.less';

/**
 * @file 状态栏
 */

const PubSub = require('pubsub-js');
export default class Status extends React.PureComponent<any, any> {
  static getDerivedStateFromProps(props, state) {
    return {
      file: state.file || props.file
    };
  }

  state = {
    codeStatus: 'normal',
    file: null
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

  acceptFile(file) {
    this.setState({ file });
  }

  render() {
    const { project } = this.props;
    const { codeStatus, file } = this.state;

    let type = '--';
    let path = '--';

    if (file) {
      path = file.path;
      type = Util.getFileType(path);
    }

    return (
      <div className='mf-status'>
        <div className='mf-status-file'>
          <img src='/assets/img/status-logo.svg' />
          <em>{project ? project.name : '--'}</em>
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
