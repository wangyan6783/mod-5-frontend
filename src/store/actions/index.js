import { ADD_EVENTS, ADD_RESORTS, UPDATE_SEARCH, UPDATE_SORT } from './actionTypes';

export const addEvents = (events) => {
  return {
    type: ADD_EVENTS,
    payload: events
  }
}

export const addResorts = (resorts) => {
  return {
    type: ADD_RESORTS,
    payload: resorts
  }
}

export const updateSearch = (term) => {
  return {
    type: UPDATE_SEARCH,
    payload: term
  }
}

export const updateSort = (type) => {
  return {
    type: UPDATE_SORT,
    payload: type
  }
}
