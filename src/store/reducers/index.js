import { combineReducers } from 'redux';
import wines from './wines';
import domaines from './domaines';
import errors from './errors';
import users from './user';

const rootReducer = combineReducers({
  wines,
  domaines,
  errors,
  users
});

export default rootReducer;
