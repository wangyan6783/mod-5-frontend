import React, { Component } from 'react';
import { connect } from 'react-redux';
import Event from './Event';
import { fetchEvents } from '../store/actions/index';

class EventList extends Component {

  componentDidMount(){
    this.props.dispatch(fetchEvents())
  }

  renderEvents(){
    const filteredEvents = this.props.events.filter(event => event.title.toLowerCase().includes(this.props.searchTerm.toLowerCase()))

    if (this.props.sortType === "Event Date") {
      return filteredEvents.sort((a, b) => {
        return new Date(a.date) - new Date(b.date)
      })
    }
    if (this.props.sortType === "Number of People Going") {
      return filteredEvents.sort((a, b) => {
        return b.users.length - a.users.length
      })
    }
    return filteredEvents
  }

  render(){
    return (
      <div id="events-container" className="wrapper event-list">
          <h1>Events</h1>
          <div className="cols">
            {this.renderEvents().map(event => <Event key={event.id} event={event} />)}
          </div>
       </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    events: state.eventReducer.events,
    searchTerm: state.eventReducer.searchTerm,
    sortType: state.eventReducer.sortType
  }
}

export default connect(mapStateToProps)(EventList)
