import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import ResortsPage from './pages/ResortsPage';
import EventsPage from './pages/EventsPage';
import NavBar from './components/NavBar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route path='/' exact render={()=><HomePage />} />
          <Route path='/resorts' exact render={()=><ResortsPage />} />
          <Route path='/events' exact render={()=><EventsPage />} />
        </Switch>
      </div>
    );
  }
}

export default App;
