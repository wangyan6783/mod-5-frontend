import React from 'react';
import Event from './Event';
import noEvents from '../images/no-events.png';

const ResortEvents = (props) => {
    if (props.events.length !== 0) {
      return(
        <div className="cols">
          {props.events.map(event => <Event key={event.id} event={event} />)}
        </div>
      )
    } else {
      return <img src={noEvents} width="720px" height="400px"/>
    }
}

export default ResortEvents
