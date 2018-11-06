import { LOAD_DOMAINES, LOAD_ONE_DOMAINE, UPDATE_DOMAINE } from '../actionTypes';
import { queryApi } from '../../services/apiCall';
import { addError } from './errors';

//action creators
const loadDomaines = domaines => ({
  type: LOAD_DOMAINES,
  domaines
});

const loadOneDomaine = domaine => ({
  type: LOAD_ONE_DOMAINE,
  domaine
});

const updateDomaine = domaine => ({
  type: UPDATE_DOMAINE,
  domaine
});

//dispatchers
export function fetchDomaines() {
  return dispatch => {
    return queryApi('get', '/api/domaines')
      .then(domaines => dispatch(loadDomaines(domaines)))
      .catch(err => dispatch(addError(err.message)));
  }
}

export function fetchOneDomaine(id) {
  return dispatch => {
    return queryApi('get', `/api/domaines/${id}`)
      .then(domaine => dispatch(loadOneDomaine(domaine)))
      .catch(err => dispatch(addError(err.message)));
  }
}

export function putDomaine(id, domaine) {
  return dispatch => {
    return queryApi('put', `/api/domaines/${id}`, domaine)
      .then(domaine => dispatch(updateDomaine(domaine)))
      .catch(err => dispatch(addError(err.message)));
  }
}
