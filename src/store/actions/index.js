import { ADD_EVENTS } from './actionTypes';

export const addEvents = (events) => {
  return {
    type: ADD_EVENTS,
    payload: events
  }
}
