import { LOAD_DOMAINES, LOAD_ONE_DOMAINE, UPDATE_DOMAINE } from '../actionTypes';

const DEFAULT_STATE = {
  domaines: [],
  selectedDomaine: {} 
};

export default (state= DEFAULT_STATE, action) => {
  switch(action.type) {
    case LOAD_DOMAINES:
      return {
	...state,
       	domaines: [...action.domaines]
      };
    case LOAD_ONE_DOMAINE:
      return {
	...state,
       	selectedDomaine: action.domaine
      };
    case UPDATE_DOMAINE:
      let updatedDomaines = state.domaines.map(domaine => domaine._id === action.domaine._id ? action.domaine : domaine);
      return {
	...state,
	domaines: [...updatedDomaines]
      };

    default :
      return state;
  }
}

