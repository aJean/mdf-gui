import { handleActions } from 'redux-actions';
import action from './action';
import FileTools from '../util/file';

/**
 * @file home reducer
 */

const types = action.types;
const projectState = FileTools.readConfig();
const fileState = { list: [], newList: null };

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
      return { ...state, list: action.payload };
    }
  },
  fileState
);
