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

export default class Code extends React.PureComponent<any, any> {
  render() {
    const { file } = this.props;
    let code = 'nothing to show !!';
    let mode = 'javascript';

    if (file) {
      code = fs.readFileSync(file.path).toString();
      mode = Util.getCodeType(file.extension);
    }

    return (
      <div className="mf-code">
        <CodeMirror
          value={code}
          options={{
            mode: mode,
            theme: 'material',
            lineNumbers: true
          }}
          onChange={(editor, data, value) => {}}
        />
      </div>
    );
  }
}
