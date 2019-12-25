import * as React from 'react';
import * as fs from 'fs';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import Util from '../util/util';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import './code.less';

/**
 * @file web ide
 */

const PubSub = require('pubsub-js');
export default class Code extends React.PureComponent<any, any> {
  value: string;

  componentDidMount() {
    document.addEventListener('keydown', function(e) {
      console.log(e.ctrlKey, e.keyCode);
    });
  }

  updateHandle = (editor, data, value) => {
    // 第一次载入 code 不要触发事件
    if (this.value !== void 0) {
      PubSub.publish('code-edit');
    }
    this.value = value;
  };

  render() {
    const { file } = this.props;
    let code = 'nothing to show !!';
    let mode = 'javascript';

    if (file) {
      code = fs.readFileSync(file.path).toString();
      mode = Util.getCodeType(file.extension);
    }

    PubSub.publish('code-load');

    return (
      <div className='mf-code'>
        <CodeMirror
          value={code}
          options={{
            mode: mode,
            theme: 'material',
            lineNumbers: true
          }}
          onChange={this.updateHandle}
        />
      </div>
    );
  }
}
