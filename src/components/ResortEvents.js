import React from 'react';
import Event from './Event';
import { Card } from 'semantic-ui-react';

const ResortEvents = (props) => {
    if (props.events.length !== 0) {
      return(
        <Card.Group itemsPerRow={3}>
          {props.events.map(event => <Event key={event.id} event={event} />)}
        </Card.Group>
      )
    } else {
      return <h2>No Events</h2>
    }
}

export default ResortEvents
