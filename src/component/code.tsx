import * as React from 'react';
import * as fs from 'fs';
import { message } from 'antd';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import Util from '../util/util';
import File from '../util/file';
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
  // code to save
  value: string;
  // load code length
  len: number;

  keyHandle = synthetic => {
    const e = synthetic.nativeEvent;

    if (e.metaKey && e.keyCode == 83) {
      this.saveCode();
    }
  };

  /**
   * 通知 status bar 改变 ui 状态
   */
  notify(msg) {
    return PubSub.publish(msg);
  }

  /**
   * 代码更新
   */
  updateHandle = (editor, data, value) => {
    // load code 不要触发事件
    if (data.origin == void 0) {
      this.notify('code-load');
      // 长度一致不需要 save
    } else if (this.len == value.length) {
      this.notify('code-save');
    } else {
      this.notify('code-edit');
    }
    this.value = value;
  };

  /**
   * 保存代码到本地
   */
  saveCode() {
    const { file } = this.props;
    const code = this.value;

    if (!file) {
      return message.warning('invalid project');
    }

    if (!code || this.len == code.length) {
      return this.notify('code-save');
    }

    const res = File.writeFile(file.path, code);
    if (res.code == -1) {
      return message.error(res.msg);
    } else {
      this.notify('code-save');
    }
  }

  render() {
    const { file } = this.props;
    let code = '';
    let mode = '';

    if (file) {
      code = fs.readFileSync(file.path).toString();
      mode = Util.getCodeType(file.extension);
    }

    this.len = code.length;
console.log('@@@@@@@@@', mode)
    return (
      <div className='mf-code' onKeyDown={this.keyHandle}>
        {code ? (
          <CodeMirror
            value={code}
            options={{
              mode: mode,
              theme: 'material',
              lineNumbers: true
            }}
            onChange={this.updateHandle}
          />
        ) : null}
      </div>
    );
  }
}
