// import fg = require('fast-glob');
import dirTree = require('directory-tree');
import path = require('path');
import fs = require('fs');
import write = require('write');

/**
 * @file 文件工具
 */

function findProjectFiles(path?: string) {
  let id = 0;
  const formatNode = item => {
    item.title = item.name;
    item.key = id++;
  };

  const tree = dirTree(path + '/src', null, formatNode, formatNode);
  return tree ? [tree] : null;
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
