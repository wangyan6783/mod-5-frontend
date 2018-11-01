import React, { Component } from 'react';
import { connect } from 'react-redux';
import Event from './Event';
import { Card } from 'semantic-ui-react';
import { addEvents } from '../store/actions/index';

class EventList extends Component {

  componentDidMount(){
    fetch("http://localhost:3001/api/v1/events")
    .then(response => response.json())
    .then(events => this.props.handleFetch(events))
  }

  render(){
    return (
      <Card.Group itemsPerRow={3}>
        {this.props.events.map(event => <Event key={event.id} event={event} />)}
      </Card.Group>
    )
  }
}

const mapStateToProps = state => {
  return {
    events: state.eventReducer.events
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleFetch: (events) => dispatch(addEvents(events))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventList)
