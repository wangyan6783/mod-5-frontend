import { ADD_EVENTS } from '../actions/actionTypes';

const defaultState = {
  events: []
}

function eventReducer(state=defaultState, action) {
  switch (action.type) {
    case ADD_EVENTS:
      return {...state, events: [...state.events, ...action.payload]}
    default:
      return state

  }
}


export default eventReducer
