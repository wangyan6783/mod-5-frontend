import React from 'react';
import Event from './Event';
import noEvents from '../images/no-events-available.png';

const ResortEvents = (props) => {
    if (props.events.length !== 0) {
      return(
        <div class="cols">
          {props.events.map(event => <Event key={event.id} event={event} />)}
        </div>
      )
    } else {
      return <img src={noEvents} alt="" className="resort-image" height="500px" width="760px" />
    }
}

export default ResortEvents
