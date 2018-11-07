import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'leaflet/dist/leaflet.css';
import HomePage from './pages/HomePage';
import ResortsPage from './pages/ResortsPage';
import ResortDetailPage from './pages/ResortDetailPage';
import EventDetailPage from './pages/EventDetailPage';
import EventsPage from './pages/EventsPage';
import TutorialsPage from './pages/TutorialsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import NotFound from './components/NotFound';
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
        <Switch>
          <Route path='/' exact render={()=><HomePage />} />
          <Route path='/home' exact render={()=><HomePage />} />
          <Route path='/resorts' exact render={()=><ResortsPage />} />
          <Route path='/resorts/:id' exact render={props=><ResortDetailPage {...props} />} />
          <Route path='/events' exact render={()=><EventsPage />} />
          <Route path='/events/:id' exact render={props=><EventDetailPage {...props} />} />
          <Route path='/tutorials' exact render={()=><TutorialsPage />} />
          <Route path='/login' exact render={()=><LoginPage />} />
          <Route path='/signup' exact component={SignupPage} />
          <Route path='/profile' exact component={ProfilePage} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>

  </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
