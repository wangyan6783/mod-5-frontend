import { ADD_EVENTS, ADD_RESORTS, UPDATE_SEARCH, UPDATE_SORT } from './actionTypes';

export const addEvents = (events) => {
  return {
    type: ADD_EVENTS,
    payload: events
  }
}

export const fetchEvents = () => {
  return (dispatch) => {
    fetch("http://localhost:3001/api/v1/events")
    .then(response => response.json())
    .then(events => dispatch(addEvents(events)))
  }
}

export const addResorts = (resorts) => {
  return {
    type: ADD_RESORTS,
    payload: resorts
  }
}

export const fetchResorts = () => {
  return (dispatch) => {
    fetch("http://localhost:3001/api/v1/resorts")
    .then(response => response.json())
    .then(resorts => dispatch(addResorts(resorts)))
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

export const createEvent = (values, resortId, redirectCb) => {
  fetch("http://localhost:3001/api/v1/events", {
    method: "POST",
    headers: {
      "Accept": 'application/json',
      "Content-Type": 'application/json'
    },
    body: JSON.stringify({
      event: {
        title: values.title,
        description: values.description,
        date: values.date,
        resort_id: resortId
      }
    })
  })
  .then(response => response.json())
  .then(event => redirectCb(`/events/${event.id}`))
}
