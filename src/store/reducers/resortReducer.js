import { ADD_RESORTS } from '../actions/actionTypes';

const defaultState = {
  resorts: []
}

function resortReducer(state=defaultState, action) {
  switch (action.type) {
    case ADD_RESORTS:
      return {...state, resorts: action.payload}
    default:
      return state

  }
}


export default resortReducer
