import { ADD_WINE, LOAD_WINES, LOAD_ONE_WINE, REMOVE_WINE, UPDATE_WINE } from '../actionTypes';
import { queryApi } from '../../services/apiCall';
import { addError } from './errors';

/* Action creators */
const loadWines = wines => ({
  type: LOAD_WINES,
  wines
}); 

const loadOneWine = selectedWine => ({
  type: LOAD_ONE_WINE,
  selectedWine
})

const addWine = wine => ({
  type: ADD_WINE,
  wine
});

const removeWine = wine => ({
  type: REMOVE_WINE,
  wine
});

const updateWine = wine => ({
  type: UPDATE_WINE,
  wine
});

/* Dispatchers */
export function fetchWines() {
  return dispatch => {
    return queryApi('get', '/api/wines')
      .then(wines => dispatch(loadWines(wines)))
      .catch(err => dispatch(addError(err.message)));
  };
};

export function fetchOneWine(id) {
  return dispatch => {
    return queryApi('get', `/api/wines/${id}`)
      .then(selectedWine => dispatch(loadOneWine(selectedWine)))
      .catch(err => dispatch(addError(err.message)));
  };
}

export function postWine(user, wine) {
  return dispatch => {
    return queryApi('post', `/api/users/${user.id}/wines`, wine)
      .then(newWine => dispatch(addWine(newWine)))
      .catch(err => dispatch(addError(err.message)));
  };
}

export function deleteWine(user, wine) {
  return dispatch => {
    return queryApi('delete', `/api/users/${user.id}/wines/${wine._id}`) 
      .then(res => dispatch(removeWine(wine)))
      .catch(err => dispatch(addError(err.message)));
  }
}

export function putWine(user, wine){
  return dispatch => {
    return queryApi('put', `/api/users/${user.id}/wines/${wine._id}`, wine) 
      .then(res => dispatch(updateWine(wine)))
      .catch(err => dispatch(addError(err.message)));
  }
}
