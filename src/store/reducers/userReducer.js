import { SET_CURRENT_USER, AUTHENTICATING_USER, AUTHENTICATED_USER, FAILED_LOGIN, UPDATE_BIO, ADD_EVENT_TO_USER, DELETE_EVENT_FROM_USER } from '../actions/actionTypes';

const defaultState = {
  user: null,
  loggedIn: false,
  authenticatingUser: false,
  failedLogin: false,
  error: null
}

function userReducer(state=defaultState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state, user: action.payload, loggedIn: true, authenticatingUser: false }
    case AUTHENTICATING_USER:
      return { ...state, authenticatingUser: true }
    case AUTHENTICATED_USER:
      return { ...state, authenticatingUser: false }
    case FAILED_LOGIN:
      return { ...state, failedLogin: true, error: action.payload, authenticatingUser: false }
    case UPDATE_BIO:
      return { ...state, user: {...state.user, bio: action.payload}}
    case ADD_EVENT_TO_USER:
      return { ...state, user: {...state.user, events: [...state.user.events, action.payload]}}
    case DELETE_EVENT_FROM_USER:
      return { ...state, user: {...state.user, events: state.user.events.filter(event => event.id != action.payload.id)}}
    default:
      return state
  }
}


export default userReducer
