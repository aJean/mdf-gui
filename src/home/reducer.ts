import { handleActions } from 'redux-actions';
import action from './action';
import File from '../util/file';

/**
 * @file home reducer
 */

const types = action.types;
const projectState = (window['project'] = File.readConfig());
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
      const payload = action.payload;
      let list = null;
      let map = null;
      let entry = null;

      if (payload.tree) {
        list = [payload.tree];
        map = payload.map;
        entry = payload.entry;
      }

      return { ...state, list, entry, map };
    }
  },
  fileState
);
