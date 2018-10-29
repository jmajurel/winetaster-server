import { combineReducers } from 'redux';
import wines from './wines';
import errors from './errors';
import users from './user';

const rootReducer = combineReducers({
  wines,
  errors,
  users
});

export default rootReducer;
