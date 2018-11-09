import React from 'react';
import Event from './Event';

const ResortEvents = (props) => {
    if (props.events.length !== 0) {
      return(
        <div class="cols">
          {props.events.map(event => <Event key={event.id} event={event} />)}
        </div>
      )
    } else {
      return <h2>No Events</h2>
    }
}

export default ResortEvents
