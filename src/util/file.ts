// import fg = require('fast-glob');
import dirTree = require('directory-tree');
import path = require('path');
import fs = require('fs');
import write = require('write');

/**
 * @file 文件工具
 */

function findProjectFiles(path?: string) {
  let id = 1;
  let entry = null;

  const map = {};
  const formatNode = (item: any) => {
    const name = item.name;
    let key = String(id++);

    if (name == 'pkg.js') {
      entry = item;
      // ['0'] to select pkg
      key = '0';
    }

    item.title = name;
    item.key = key;
    map[key] = item;
  };

  const tree = dirTree(path + '/src', null, formatNode, formatNode);
  return { tree, map, entry };
}

/**
 * 读取 project config
 */
function readConfig() {
  try {
    const config = fs.readFileSync(path.resolve(process.cwd(), 'config/project.json'));
    return JSON.parse(config.toString());
  } catch (e) {
    return null;
  }
}

/**
 * 重写 project config
 * @return {Object|undefined} flag
 */
function writeConfig(content: string) {
  try {
    const file = path.resolve(process.cwd(), 'config/project.json');
    return write.sync(file, content, { newline: true, overwrite: true });
  } catch (e) {
    return { code: -1, msg: e.message };
  }
}

export default {
  findProjectFiles,
  readConfig,
  writeConfig
};
