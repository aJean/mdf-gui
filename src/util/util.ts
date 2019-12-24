/**
 * @file util tools
 */

function getShare(key: string) {
  return require('electron').remote.getGlobal(key);
}

const FileType = {
  'js': 'JavaScript',
  'ts': 'TypeScript',
  'jsx': 'JavaScript React',
  'tsx': 'TypeScript React',
  'css': 'Css',
  'less': 'Less'
};

const CodeType = {
  '.js': 'javascript',
  '.ts': 'javascript',
  '.jsx': 'javascript',
  '.tsx': 'javascript',
  '.css': 'text/css',
  '.less': 'text/x-less'
};

function parseFile(file: string) {
  let tokens = file.split('/');
  const name = tokens.pop();
  tokens = name.split('.');
  const type = tokens.pop();

  return { name, type: FileType[type] };
}

function getFileType(path: string) {
  let tokens = path.split('/');
  const name = tokens.pop();
  tokens = name.split('.');
  const type = tokens.pop();

  return FileType[type];
}

function getCodeType(ext) {
  return CodeType[ext];
}

export default {
  getShare,
  parseFile,
  getFileType,
  getCodeType
};
