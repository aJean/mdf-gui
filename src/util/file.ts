import fg = require('fast-glob');
import dirTree = require('directory-tree');

/**
 * @file 文件工具
 */

function find(path?: string) {
  let id = 0;
  const formatNode = item => {
    item.title = item.name;
    item.key = id++;
  };

  const tree = dirTree(path + '/src', null, formatNode, formatNode);
  return [tree];
}

export default {
  find
};
