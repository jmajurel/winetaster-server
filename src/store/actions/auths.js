import { SET_CURRENT_USER } from '../actionTypes';
import { addError } from './errors';
import { deleteError } from './errors';
import { setTokenHeader, queryApi } from '../../services/apiCall';

/* action creators */
const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user
});

const setAuthToken = token => {
  setTokenHeader(token);
}

/* dispatchers */
export function logout() {
  return dispatch => {
    setTokenHeader(false); 
    dispatch(setCurrentUser({}));
  }
}

/* type: login, signup */
export function authUser(type, user) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      queryApi('post', `/api/auth/${type}`, user)
	.then(({ ...user, token }) => {
	  setAuthToken(token);
	  dispatch(setCurrentUser(user));
	  dispatch(deleteError());
	  resolve();
	}).catch(err => {
	  dispatch(addError(err.message));
	  reject();
	});
    });
  }
}
