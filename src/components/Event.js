import React from 'react';
import { Button, Card, Image, Icon } from 'semantic-ui-react';


const Event = (props) => {
  // console.log(props);

  const { title, description, start_time } = props.event

  const formateTime = start_time.split("T")[0]

  return (
    <Card>
      <Image src='https://www.scimarche.it/wp-content/uploads/2017/10/coppa-del-mondo-sci-2017-2018.jpg' />
      <Card.Content>
        <Card.Header>{title}</Card.Header>
        <Card.Meta>
          <span className='date'>{formateTime}</span>
        </Card.Meta>
        <Card.Description>{description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a>
          <Icon name='user' />
          22 Friends
        </a>
      </Card.Content>
    </Card>
  )
}

export default Event
