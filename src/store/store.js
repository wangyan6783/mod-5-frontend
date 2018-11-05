import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import {reducer as formReducer } from 'redux-form';
import userReducer from './reducers/userReducer';
import eventReducer from './reducers/eventReducer';
import resortReducer from './reducers/resortReducer';
import tutorialReducer from './reducers/tutorialReducer';

const rootReducer = combineReducers({
  userReducer,
  eventReducer,
  resortReducer,
  tutorialReducer,
  form: formReducer
})

const composeEnhancers =  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(
applyMiddleware(thunk)
);

const store = createStore(rootReducer, enhancer)

export default store
