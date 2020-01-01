/**
 * @file util tools
 */

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
  '.css': 'text/css',
  '.less': 'text/x-less',
  '.html': 'text/html'
};

export default {
  getShare(key: string) {
    return require('electron').remote.getGlobal(key);
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

  insertDom(elem: HTMLElement, content: string) {
    const div = document.createElement('div');
    div.innerHTML = content;
    elem.appendChild(div);
  }
};
