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
  'css': 'CSS',
  'less': 'LESS'
};

function parseFile(file: string) {
  let tokens = file.split('/');
  const name = tokens.pop();
  tokens = name.split('.');
  const type = tokens.pop();

  return { name, type: FileType[type] };
}

export default {
  getShare,
  parseFile
};
