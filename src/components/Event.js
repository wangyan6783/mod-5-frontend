import React from 'react';
import {Button, Card, Image, Icon} from 'semantic-ui-react';

const Event = (props) => {
  // console.log(props);

  const {title, description, start_time} = props.event

  const formateTime = start_time.split("T")[0]

  return (
  		<div class="col" ontouchstart="this.classList.toggle('hover');">
  			<div class="container">
  				<div class="front" style={{backgroundImage: ` url(https://unsplash.it/508/508/)`}}>
  					<div class="inner">
  						<p>{title}</p>
              <span>{formateTime}</span>
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
