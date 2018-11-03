import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'leaflet/dist/leaflet.css';
import HomePage from './pages/HomePage';
import ResortsPage from './pages/ResortsPage';
import ResortDetailPage from './pages/ResortDetailPage';
import EventsPage from './pages/EventsPage';
import NavBar from './components/NavBar';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from './store/store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <NavBar />
        <Route path='/' exact render={()=><HomePage />} />
        <Route path='/resorts' exact render={()=><ResortsPage />} />
        <Route path='/resorts/:id' exact render={props=><ResortDetailPage {...props} />} />
        <Route path='/events' exact render={()=><EventsPage />} />
      </div>
    </Router>

  </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
