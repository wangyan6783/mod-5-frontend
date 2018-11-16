import React from 'react';
import Event from './Event';
import noEvents from '../images/no-events.png';

const ResortEvents = (props) => {
    if (props.events.length !== 0) {
      return(
        <div class="cols">
          {props.events.map(event => <Event key={event.id} event={event} />)}
        </div>
      )
    } else {
      return <img src={noEvents} alt="" className="resort-image" height="450px" width="720px" />
    }
}

export default ResortEvents
