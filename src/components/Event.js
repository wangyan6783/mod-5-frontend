import React from 'react';
import { withRouter } from "react-router";
import { Button } from 'semantic-ui-react';

const Event = (props) => {

  const {id, title, description, date, image_url} = props.event

  const showDetails = () => {
    props.history.push(`/events/${id}`)
  }

  return (
  		<div className="col" ontouchstart="this.classList.toggle('hover');">
  			<div className="container">
  				<div className="front" style={{backgroundImage: ` url(${image_url})`}}>
  					<div className="inner">
  						<p>{title}</p>
              <span>{date}</span>
  					</div>
  				</div>
  				<div className="back">
  					<div className="inner">
  						<p>{description}</p>
              <Button onClick={showDetails}>Detail</Button>
  					</div>
  				</div>
  			</div>
  		</div>
  )
}

export default withRouter(Event)
