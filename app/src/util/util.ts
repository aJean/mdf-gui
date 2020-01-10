/**
 * @file util tools
 */

const CMD = require('node-cmd');
const remote = require('electron').remote;

const FileType = {
  js: 'JavaScript',
  ts: 'TypeScript',
  jsx: 'JavaScript React',
  tsx: 'TypeScript React',
  css: 'Css',
  less: 'Less'
};

const CodeType = {
  '.js': 'javascript',
  '.ts': 'javascript',
  '.jsx': 'javascript',
  '.tsx': 'javascript',
  '.json': 'javascript',
  '.css': 'text/css',
  '.less': 'text/x-less',
  '.html': 'text/html'
};

export default {
  getShare(key: string) {
    return remote.getGlobal(key);
  },

  parseFile(file: string) {
    let tokens = file.split('/');
    const name = tokens.pop();
    tokens = name.split('.');
    const type = tokens.pop();

    return { name, type: FileType[type] };
  },

  getFileType(path: string) {
    let tokens = path.split('/');
    const name = tokens.pop();
    tokens = name.split('.');
    const type = tokens.pop();

    return FileType[type];
  },

  getCodeType(ext: string) {
    return CodeType[ext];
  },

  getLocalWin() {
    return require('electron').remote.getCurrentWindow();
  },

  /**
   * 执行 cli 命令
   */
  shell(cmd: string) {
    return new Promise(function(resolve, reject) {
      CMD.get(cmd, function(err, data, stderr) {
        err ? reject(err) : resolve(data);
      });
    });
  },

  /**
   * 所有外链图片都要用这个方法转化
   */
  getFilePath(url) {
    const info = remote.getGlobal('info');
    const protocol = process.env.NODE_ENV === 'production' ? `file://${info.appPath}` : ``;
    return `${protocol}${url}`;
  }
};
