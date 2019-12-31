import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { projectReducer, fileReducer } from './reducer';

/**
 * @file home store
 */

const initState = {
  project: undefined,
  file: undefined
};


const reducers = combineReducers({
  project: projectReducer,
  file: fileReducer
});

export default createStore(reducers, initState);
