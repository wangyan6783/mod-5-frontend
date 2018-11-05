import { UPDATE_TUTORIAL_SELECT } from '../actions/actionTypes';

const defaultState = {
  tutorials: []
}

function turotialReducer(state=defaultState, action) {
  switch (action.type) {
    case UPDATE_TUTORIAL_SELECT:
      return {...state, tutorials: action.payload}
    default:
      return state
  }
}


export default turotialReducer;
