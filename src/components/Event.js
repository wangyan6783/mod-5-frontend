import React from 'react';
import {Button, Card, Image, Icon} from 'semantic-ui-react';

const Event = (props) => {

  const {title, description, date, image_url} = props.event

  return (
  		<div class="col" ontouchstart="this.classList.toggle('hover');">
  			<div class="container">
  				<div class="front" style={{backgroundImage: ` url(${image_url})`}}>
  					<div class="inner">
  						<p>{title}</p>
              <span>{date}</span>
  					</div>
  				</div>
  				<div class="back">
  					<div class="inner">
  						<p>{description}</p>
  					</div>
  				</div>
  			</div>
  		</div>
  )
}

export default Event
