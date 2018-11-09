import { ADD_EVENTS, ADD_RESORTS, UPDATE_SEARCH, UPDATE_SORT, UPDATE_TUTORIAL_SELECT, AUTHENTICATING_USER, SET_CURRENT_USER, FAILED_LOGIN, UPDATE_BIO } from './actionTypes';
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

  const endPoint = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&q=${searchTerm}&maxResults=45&type=video&part=snippet&order=viewCount`
  // const endPoint = `https://www.googleapis.com/youtube/v3/videos?id=V9xuy-rVj9w&key=${YOUTUBE_API_KEY}&part=snippet,contentDetails,statistics,status`

  return (dispatch) => {
    fetch(endPoint)
    .then(response => response.json())
    .then(tutorials => dispatch({type: UPDATE_TUTORIAL_SELECT, payload: tutorials}))
  }
}

export const createEvent = (values, resortId, hostId, redirectCb) => {
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
        host_id: hostId
      }
    })
  })
  .then(response => response.json())
  .then(event => {
    console.log(event);
    redirectCb(`/events/${event.id}`)
  } )
}

export const addUserEvent = (eventId, userId) => {
    fetch("http://localhost:3001/api/v1/user_events", {
      method: "POST",
      headers: {
        "Accept": 'application/json',
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        user_event: {
          event_id: eventId,
          user_id: userId
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

export const saveTutorial = (videoId, userId) => {
  fetch("http://localhost:3001/api/v1/tutorials", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      tutorial: {
        video_id: videoId
      }
    })
  })
  .then(response => response.json())
  .then(tutorial =>
    fetch("http://localhost:3001/api/v1/user_tutorials", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_tutorial: {
          tutorial_id: tutorial.id,
          user_id: userId
        }
      })
    })
    .then(response => response.json())
    .then(userTutorial => console.log(userTutorial))
  )
}

export const loginUser = (username, password) => {
  return (dispatch) => {
    dispatch({ type: AUTHENTICATING_USER })
    fetch("http://localhost:3001/api/v1/login", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: {
          username,
          password
        }
      })
    })
    .then(response => {
      if (!response.ok) {
        throw response
      }
      return response.json()
    })
    /* { user:
     { username: 'chandler bing', bio: '', avatar: '' },
     jwt: 'aaaaaaaaaaaaaaa.bbbbbbbbbbbbbbbbbbbbb.ccccccccccccccccccc'
     } */
    .then(data => {
      localStorage.setItem('jwt', data.jwt)
      dispatch({ type: SET_CURRENT_USER, payload: data.user })
    })
    .catch(r => r.json().then(e => dispatch({ type: FAILED_LOGIN, payload: e.message }))
    )
  }
}

export const signupUser = (username, password) => {
  return (dispatch) => {
    dispatch({ type: AUTHENTICATING_USER })
    fetch("http://localhost:3001/api/v1/users", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: {
          username,
          password
        }
      })
    })
    .then(response => {
      if (!response.ok) {
        throw response
      }
      return response.json()
    })
    /* { user:
     { username: 'chandler bing', bio: '', avatar: '' },
     jwt: 'aaaaaaaaaaaaaaa.bbbbbbbbbbbbbbbbbbbbb.ccccccccccccccccccc'
     } */
    .then(data => {
      localStorage.setItem('jwt', data.jwt)
      dispatch({ type: SET_CURRENT_USER, payload: data.user })
    })
    .catch(r => r.json().then(e => dispatch({ type: FAILED_LOGIN, payload: e.message }))
    )
  }
}

export const fetchCurrentUser = () => {
  return dispatch => {
    dispatch({ type: AUTHENTICATING_USER })
    fetch("http://localhost:3001/api/v1/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then(response => response.json())
    .then(data => dispatch({ type: SET_CURRENT_USER, payload: data.user })
    )
  }
}

export const addBio = (userId, bio) => {
  return dispatch => {
    fetch(`http://localhost:3001/api/v1/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        bio
      })
    })
    .then(response => response.json())
    .then(data => dispatch({ type: UPDATE_BIO, payload: data.bio }))
  }
}
