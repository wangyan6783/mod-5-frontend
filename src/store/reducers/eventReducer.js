import { ADD_EVENTS, UPDATE_SEARCH, UPDATE_SORT } from '../actions/actionTypes';

const defaultState = {
  events: [],
  searchTerm: "",
  sortType: ""
}

function eventReducer(state=defaultState, action) {
  switch (action.type) {
    case ADD_EVENTS:
      return {...state, events: action.payload}
    case UPDATE_SEARCH:
      return {...state, searchTerm: action.payload}
    case UPDATE_SORT:
      return {...state, sortType: action.payload}
    default:
      return state

  }
}


export default eventReducer
