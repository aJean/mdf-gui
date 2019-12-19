import { handleActions } from 'redux-actions';
import action from './action';
import File from '../util/file';

/**
 * @file home reducer
 */

const types = action.types;
const projectState = window['project'] = File.readConfig();
const fileState = { list: [], newList: null, entryFile: null };

/**
 * 项目信息 reducer
 */
export const projectReducer = handleActions(
  {
    [types.Project_Init]: function(state: any, action: any) {
      return action.payload || state;
    }
  },
  projectState
);

/**
 * 文件处理 reducer
 */
export const fileReducer = handleActions(
  {
    [types.File_Int]: function(state, action: any) {
      const list = action.payload;
      let entryFile = null;
      // 默认展示 pkg 文件
      if (list) {
        entryFile = list[0].path + '/pkg.js';
      }

      return { ...state, list, entryFile };
    }
  },
  fileState
);
