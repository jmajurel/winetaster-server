import { ADD_WINE, LOAD_WINES, LOAD_ONE_WINE, REMOVE_WINE, UPDATE_WINE } from '../actionTypes'; 

const DEFAULT_STATE = {
  selectedWine: {},
  wines: []
};

export default (state= DEFAULT_STATE, action) => {
  switch(action.type) {
    case ADD_WINE:
      return {
	...state,
       	wines: [...state.wines, action.wine]
      };
    case LOAD_WINES:
      return {
	...state,
       	wines: [...action.wines]
      };
    case LOAD_ONE_WINE:
      return {
	...state,
	selectedWine: action.selectedWine,
      };
    case REMOVE_WINE:
      return {
	...state,
	wines: action.wines.filter(wine => wine.id !== action.wine.id)
      };

    case UPDATE_WINE:
      let updatedWines = action.wines.map(wine => wine.id === action.wine.id ? action.wine: wine)
      return {
	...state,
	wines: updatedWines
      };
    default:
      return state;
  }
}
