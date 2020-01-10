import * as React from 'react';
import { getIconForFile, getIconForFolder } from 'vscode-icons-js';
import Util from '../util/util';
import './fileIcon.less';

/**
 * @file file type icon
 */

export default class FileIcon extends React.Component<any, any> {
  render() {
    const { file } = this.props;
    const icon = file.type == 'file' ? getIconForFile(file.title) : getIconForFolder(file.title);
    const uri = Util.getFilePath(`/assets/icons/${icon}`);

    return (
      <span className='mf-fileicon'>
        <img src={uri} />
      </span>
    );
  }
}
