import * as fs from 'fs';
import fg = require('fast-glob');

/**
 * @file 文件工具
 */

function find(path?: string) {
  path = '/Users/qiaoyue/WorkSpace/mfdemo/src/**';
  return fg.sync(path);
}

export default {
  find
};
