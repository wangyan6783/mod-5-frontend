import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer';
import eventReducer from './reducers/eventReducer';

const rootReducer = combineReducers({
  userReducer,
  eventReducer
})

const composeEnhancers =  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(
applyMiddleware(thunk)
);

const store = createStore(rootReducer, enhancer)

export default store
