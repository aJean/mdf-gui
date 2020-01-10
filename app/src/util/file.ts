// import fg = require('fast-glob');
import dirTree = require('directory-tree');
import fs = require('fs');
import write = require('write');
import rimraf = require('rimraf');
const remote = require('electron').remote;

/**
 * @file 文件工具
 */

export default {
  /**
   * 读文件
   */
  readFile(path) {
    return fs.readFileSync(path).toString();
  },

  /**
   * 写文件
   */
  writeFile(path: string, code: string) {
    try {
      return write.sync(path, code, { newline: true, overwrite: true });
    } catch (e) {
      return { code: -1, msg: e.message };
    }
  },

  /**
   * 读取文件树
   * @param {string} path 项目路径
   */
  findFiles(path?: string) {
    try {
      fs.accessSync(path);
    } catch (e) {
      return {};
    }

    let id = 1;
    let entry = null;
    const srcPath = `${path}/src`;
    // 直接读取本地文件，减少参数复杂度
    const project = this.readConfig();

    try {
      fs.accessSync(srcPath);
    } catch (e) {
      fs.mkdirSync(srcPath);
    }

    const map = {};
    const formatNode = (item: any) => {
      const name = item.name;
      let key = String(id++);

      if (name == 'src') {
        key = 'root';
      } else if (item.path == (project && project.entry)) {
        entry = item;
        key = 'default';
      }

      item.title = name;
      item.key = key;
      map[key] = item;
    };

    const tree = dirTree(path + '/src', null, formatNode, formatNode);
    return { list: tree && [tree], map, entry };
  },

  /**
   * 读取 project config
   */
  readConfig() {
    try {
      const config = fs.readFileSync(`${remote.getGlobal('info').appPath}/config/project.json`);
      return JSON.parse(config.toString());
    } catch (e) {
      return null;
    }
  },

  /**
   * 重写 project config
   */
  writeConfig(data: object | string) {
    if (typeof data == 'object') {
      data = JSON.stringify(data);
    }

    try {
      const filePath = `${remote.getGlobal('info').appPath}/config/project.json`;
      return write.sync(filePath, data, { newline: true, overwrite: true });
    } catch (e) {
      return { code: -1, msg: e.message };
    }
  },

  exist(path: string) {
    try {
      fs.accessSync(path);
      return true;
    } catch (error) {
      return false;
    }
  },

  /**
   * 新建
   * @param path
   * @param type 类别 1 文件 2目录
   */
  mknew(path: string, type = 1) {
    try {
      type == 1 ? write.sync(path) : fs.mkdirSync(path);
      return { code: 0 };
    } catch (e) {
      return { code: -1, msg: e.message };
    }
  },

  /**
   * 删除
   */
  rm(path: string) {
    try {
      rimraf.sync(path);
      return { code: 0 };
    } catch (e) {
      return { code: -1, msg: e.message };
    }
  },

  /**
   * 选择系统路径
   */
  selectPath() {
    const dialog = require('electron').remote.dialog;
    return dialog.showOpenDialog({ properties: ['openDirectory'], buttonLabel: '选择'});
  }
};
