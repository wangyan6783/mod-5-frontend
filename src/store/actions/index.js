import { ADD_EVENTS, ADD_USER_EVENT, DELETE_USER_EVENT, SET_CURRENT_EVENT, ADD_RESORTS, UPDATE_SEARCH, UPDATE_SORT, UPDATE_TUTORIAL_SELECT, SAVE_USER_TUTORIAL, AUTHENTICATING_USER, SET_CURRENT_USER, FAILED_LOGIN, UPDATE_BIO, UPDATE_PROFILE_PHOTO } from './actionTypes';
import { YoutubeAPIKey, cloudinaryUrl, cloudinaryUploadPreset, backendEndpoint } from '../../secretKeys';

// fetch all resorts when ResortsPage is loaded and add them to the redux store
export const addResorts = (resorts) => {
  return {
    type: ADD_RESORTS,
    payload: resorts
  }
}

export const fetchResorts = () => {
  return (dispatch) => {
    fetch(`${backendEndpoint}/resorts`)
    .then(response => response.json())
    .then(resorts => dispatch(addResorts(resorts)))
  }
}

// create a new event in the backend ResortDetailPage
export const createEvent = (values, resortId, hostId, redirectCb) => {
  fetch(`${backendEndpoint}/events`, {
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
    debugger
    redirectCb(`/events/${event.id}`)
  })
}

// fetch all events when EventsPage is loaded and add to the redux store
export const addEvents = (events) => {
  return {
    type: ADD_EVENTS,
    payload: events
  }
}

export const fetchEvents = () => {
  return (dispatch) => {
    fetch(`${backendEndpoint}/events`)
    .then(response => response.json())
    .then(events => dispatch(addEvents(events)))
  }
}

// update the event search term in the redux store
export const updateSearch = (term) => {
  return {
    type: UPDATE_SEARCH,
    payload: term
  }
}

// update the event sort type in the redux store
export const updateSort = (type) => {
  return {
    type: UPDATE_SORT,
    payload: type
  }
}

// update the current event in the redux store when EventDetailPage is loaded
export const setCurrentEvent = (event) => {
  return {
    type: SET_CURRENT_EVENT,
    payload: event
  }
}

// create a user event join table instance in the backend and add it to the redux store when a user signup for an event on the EventDetailPage
export const addUserEvent = (event, user) => {
    return dispatch => {
      fetch(`${backendEndpoint}/user_events`, {
        method: "POST",
        headers: {
          "Accept": 'application/json',
          "Content-Type": 'application/json'
        },
        body: JSON.stringify({
          user_event: {
            event_id: event.id,
            user_id: user.id
          }
        })
      })
      .then(response => response.json())
      .then(userEvent => {
        dispatch({type: ADD_USER_EVENT, payload: {userEvent, event, user}})
      })

    }
}

// delete the user event join table instance in the backend and remove it from the redux store when a user choose not going to an event on the EventDetailPage
export const deleteUserEvent = (userEvent, event, user) => {
  return dispatch => {
    fetch(`${backendEndpoint}/user_events/${userEvent.id}`, {
      method: "DELETE"
    })
    .then(response => response.json())
    .then(userEvent => {
      dispatch({type: DELETE_USER_EVENT, payload: {userEvent, event, user}})
    })

  }
}

// update comment like counts in the backend on the Comment component
export const updateLikes = (commentId, like_count) => {
  fetch(`${backendEndpoint}/comments/${commentId}`, {
    method: "PATCH",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        like_count
      })
  })
  // .then(response => response.json())
  // .then(data => console.log(data))
}


// update tutorials in the redux store based on search terms
export const updateTutorialSelect = (searchTerm) => {
  const YoutubeEndPoint = `https://www.googleapis.com/youtube/v3/search?key=${YoutubeAPIKey}&q=${searchTerm}&maxResults=30&type=video&part=snippet&order=viewCount`
  // const endPoint = `https://www.googleapis.com/youtube/v3/videos?id=V9xuy-rVj9w&key=${YOUTUBE_API_KEY}&part=snippet,contentDetails,statistics,status`

  return (dispatch) => {
    fetch(YoutubeEndPoint)
    .then(response => response.json())
    .then(tutorials => dispatch({type: UPDATE_TUTORIAL_SELECT, payload: tutorials}))
  }
}

// create a new tutorial in the backend and use the newly created tutorial id and user id to create a user tutorial join table instance in the backend also add this tutorial in the redux store from the user reducer
export const saveTutorial = (videoId, userId) => {
  return (dispatch) => {
      fetch(`${backendEndpoint}/tutorials`, {
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
      .then(tutorial => {
        dispatch({type: SAVE_USER_TUTORIAL, payload: tutorial})
        // console.log(tutorial)
        fetch(`${backendEndpoint}/user_tutorials`, {
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
        // .then(response => response.json())
        // .then(userTutorial => console.log(userTutorial))
       }
      )
    }
}

// send the user login infomation to the backend to authenticate user, if successfully logged in, save jwt to the localStorage
export const loginUser = (username, password) => {
  return (dispatch) => {
    dispatch({ type: AUTHENTICATING_USER })
    fetch(`${backendEndpoint}/login`, {
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

// use the user signup infomation to create a new user in the backend, if successfully signed up, log user in and save jwt to the localStorage
export const signupUser = (username, password) => {
  return (dispatch) => {
    dispatch({ type: AUTHENTICATING_USER })
    fetch(`${backendEndpoint}/users`, {
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

// when page is refreshed, the redux store will lose the current user infomation. Check jwt in the backend, if it's an authenticated user, have user automatically logged in.
export const fetchCurrentUser = () => {
  return dispatch => {
    dispatch({ type: AUTHENTICATING_USER })
    fetch(`${backendEndpoint}/profile`, {
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

// update user profile avatar in the backend and the redux store, ProfilePage
export const updateBackendProfile = (userId, avatarUrl) => {
  fetch(`${backendEndpoint}/users/${userId}`, {
    method: "PATCH",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      avatar: avatarUrl
    })
  })
  // .then(response => response.json())
  // .then(console.log)
}

export const updateProfilePhoto = (userId, file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', cloudinaryUploadPreset);
  return dispatch => {
    fetch(cloudinaryUrl, {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      updateBackendProfile(userId, data.secure_url)
      dispatch({type: UPDATE_PROFILE_PHOTO, payload: data.secure_url})
    })

  }
}

// update user profile bio in the backend and the redux store, ProfilePage
export const addBio = (userId, bio) => {
  return dispatch => {
    fetch(`${backendEndpoint}/users/${userId}`, {
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
