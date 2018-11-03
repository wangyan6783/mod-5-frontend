import React from 'react';
import Event from './Event';
import { Card } from 'semantic-ui-react';

const ResortEvents = (props) => {
    if (props.events.length !== 0) {
      return(
        <div class="wrapper">
            <h1>Events</h1>
            <div class="cols">
              {props.events.map(event => <Event key={event.id} event={event} />)}
            </div>
         </div>

      )
    } else {
      return <h1>No Events</h1>
    }
}

export default ResortEvents
