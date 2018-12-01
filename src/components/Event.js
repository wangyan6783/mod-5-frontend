import React from 'react';
import { Link } from 'react-router-dom';
import {Button} from 'semantic-ui-react';

const Event = (props) => {

  const {id, title, users, date, image_url} = props.event

  return (<div className="col" onTouchStart={() => this.classList.toggle('hover')}>
    <div className="container">
      <div className="front" style={{
          backgroundImage: ` url(${image_url})`
        }}>
        <div className="inner">
          <p>{title}</p>
          <span>{date}</span>
        </div>
      </div>
      <div className="back">
        <div className="inner">
          <p>{users.length} People Going!</p>
          <Link to={`/events/${id}`}><Button basic="basic" color="grey" inverted="inverted">Detail</Button></Link>
        </div>
      </div>
    </div>
  </div>)
}

export default Event
