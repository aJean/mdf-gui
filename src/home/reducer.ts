import { handleActions } from 'redux-actions';
import action from './action';
import File from '../util/file';

/**
 * @file home reducer
 */

const types = action.types;
const pstate = File.readConfig();
const fstate = File.findFiles(pstate? pstate.path: null);

/**
 * 项目信息 reducer
 */
export const projectReducer = handleActions(
  {
    [types.Project_Init]: function(state: any, action: any) {
      return action.payload || state;
    }
  },
  pstate
);

/**
 * 文件处理 reducer
 */
export const fileReducer = handleActions(
  {
    [types.File_Int]: function(state, action: any) {
      return action.payload || null;
    }
  },
  fstate
);
