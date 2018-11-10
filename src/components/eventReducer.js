import { ADD_EVENTS, SET_CURRENT_EVENT, ADD_USER_EVENT, DELETE_USER_EVENT, UPDATE_SEARCH, UPDATE_SORT } from '../actions/actionTypes';

const defaultState = {
  events: [],
  currentEvent: {},
  searchTerm: "",
  sortType: ""
}

function eventReducer(state=defaultState, action) {
  switch (action.type) {
    case ADD_EVENTS:
      return {...state, events: action.payload}
    case SET_CURRENT_EVENT:
      return {...state, currentEvent: action.payload}
    case ADD_USER_EVENT:
      return {...state, currentEvent: {...state.currentEvent, user_events: [...state.currentEvent.user_events, action.payload.userEvent], users: [...state.currentEvent.users, action.payload.user]}}
    case DELETE_USER_EVENT:
      return {...state, currentEvent: {...state.currentEvent, user_events: state.currentEvent.user_events.filter(userEvent => userEvent.id !== action.payload.userEvent.id), users: state.currentEvent.users.filter(user => user.id !== action.payload.user.id)}}
    case UPDATE_SEARCH:
      return {...state, searchTerm: action.payload}
    case UPDATE_SORT:
      return {...state, sortType: action.payload}
    default:
      return state

  }
}


export default eventReducer
