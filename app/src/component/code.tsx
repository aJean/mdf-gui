import * as React from 'react';
import * as fs from 'fs';
import { message } from 'antd';
import { UnControlled } from 'react-codemirror2';
import Util from '../util/util';
import File from '../util/file';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/mode/css/css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/addon/hint/show-hint.css';
import './code.less';

/**
 * @file web ide
 */

const PubSub = require('pubsub-js');
const CodeMirror = require('codemirror');
const pty = require('node-pty');
const Terminal = require('xterm').Terminal;
const xterm = new Terminal({
  rendererType: 'canvas',
  cursorStyle: 'underline',
  convertEol: true,
  disableStdin: false
});
const ptyProcess = pty.spawn('ZSH', [], {
  name: 'xterm-color',
  cols: 80,
  rows: 24,
  cwd: process.env.HOME,
  env: process.env
});

export default class Code extends React.PureComponent<any, any> {
  static getDerivedStateFromProps(props, state) {
    return {
      file: state.file || props.file
    };
  }

  componentDidMount() {
    xterm.onData(data => ptyProcess.write(data));

    ptyProcess.on('data', data => {
      if (xterm.init) {
        xterm.write(data);
      }
      xterm.init = true;
    });
    // xterm.open(this.refs.xterm);
  }

  componentWillUnmount() {
    xterm.dispose();
    ptyProcess.destroy();
  }

  state = { file: null };
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
    const { file } = this.state;
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
      // 保存成功，更新 len
      this.len = code.length;
      this.notify('code-save');
    }
  }

  /**
   * 外部传入 file
   */
  acceptFile(file) {
    this.setState({ file });
  }

  /**
   * 代码提示
   */
  autoComplete = editor => {
    const cur = editor.getCursor();
    const token = editor.getTokenAt(cur);

    if (/^[a-zA-Z]+$/.test(token.string)) {
      editor.showHint({
        completeSingle: false,
        hint: function() {
          if (token.string == 'qy') {
            return { list: ['qy1', 'qy2'] };
          }
          return CodeMirror.hint.javascript(editor);
        }
      });
    }
  };

  render() {
    const { file } = this.state;
    let code = '';
    let mode = '';

    if (file) {
      code = fs.readFileSync(file.path).toString();
      mode = Util.getCodeType(file.extension);
    }

    this.len = code.length;

    return (
      <div className='mf-code' onKeyDown={this.keyHandle}>
        {code ? (
          <UnControlled
            value={code}
            options={{
              mode: mode,
              theme: 'material',
              lineNumbers: true
            }}
            onChange={this.updateHandle}
            onCursorActivity={this.autoComplete}
          />
        ) : null}
        <div ref="xterm" className='mf-xterm'></div>
      </div>
    );
  }
}
