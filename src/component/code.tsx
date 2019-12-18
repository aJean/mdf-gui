import * as React from 'react';
import * as fs from 'fs';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import './code.less';
require('codemirror/mode/javascript/javascript');

/**
 * @file web ide
 */

export default class Code extends React.Component<any, any> {
  render() {
    const { path } = this.props;
    let code = 'nothing to show !!';
console.log(path)
    if (path) {
      code = fs.readFileSync(path).toString();
    }

    return (
      <div className="mf-code">
        <CodeMirror
          value={code}
          options={{
            mode: 'javascript',
            theme: 'material',
            lineNumbers: true
          }}
          onChange={(editor, data, value) => {}}
        />
      </div>
    );
  }
}
