import { ADD_EVENTS, ADD_RESORTS, UPDATE_SEARCH, UPDATE_SORT, UPDATE_TUTORIAL_SELECT } from './actionTypes';
import { YOUTUBE_API_KEY } from '../../APIKeys';

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

export const updateTutorialSelect = (searchTerm) => {

  const endPoint = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&q=${searchTerm}&maxResults=15&type=video&part=snippet&order=viewCount`

  return (dispatch) => {
    fetch(endPoint)
    .then(response => response.json())
    .then(tutorials => dispatch({type: UPDATE_TUTORIAL_SELECT, payload: tutorials}))
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
        image_url: "http://this.deakin.edu.au/wp-content/uploads/2016/10/snowboarder3.jpg",
        resort_id: resortId,
        host_id: 105
      }
    })
  })
  .then(response => response.json())
  .then(event => redirectCb(`/events/${event.id}`))
}

export const addUserEvent = (eventId) => {
  fetch("http://localhost:3001/api/v1/user_events", {
    method: "POST",
    headers: {
      "Accept": 'application/json',
      "Content-Type": 'application/json'
    },
    body: JSON.stringify({
      user_event: {
        event_id: eventId,
        user_id: 105
      }
    })
  })
  .then(response => response.json())
  .then(data => console.log(data))
}

export const deleteUserEvent = (userEventId) => {
  fetch(`http://localhost:3001/api/v1/user_events/${userEventId}`, {
    method: "DELETE"
  })
  .then(response => response.json())
  .then(data => console.log(data))
}

export const updateLikes = (commentId, like_count) => {
  fetch(`http://localhost:3001/api/v1/comments/${commentId}`, {
    method: "PATCH",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        like_count
      })
  })
  .then(response => response.json())
  .then(data => console.log(data))
}
