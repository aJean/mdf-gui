import { handleActions } from 'redux-actions';
import action from './action';

/**
 * @file home reducer
 */

const types = action.types;

export const projectReducer = handleActions(
  {
    [types.Project_Init]: function(state, action: any) {
      return { ...state, path: action.payload };
    }
  },
  {
    path: '/Users/qiaoyue/WorkSpace/mfdemo',
    name: 'mfdemo'
  }
);

export const fileReducer = handleActions(
  {
    [types.File_Int]: function(state, action: any) {
      return { ...state, list: action.payload };
    }
  },
  {
    list: [],
    newList: null
  }
);
