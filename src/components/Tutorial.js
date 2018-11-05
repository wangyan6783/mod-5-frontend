import React from 'react';
import { Card, Icon, Button, Label } from 'semantic-ui-react';

const Tutorial = (props) => {
  const { id, snippet } = props.tutorial
  const videoUrl = `http://www.youtube.com/embed/${id.videoId}`;
  return (
    <Card>
      <iframe src={videoUrl} frameBorder="0" allowFullScreen></iframe>
      <Card.Content>
        <Card.Header>{snippet.title}</Card.Header>
        <Card.Meta>
          <span className='date'>Published at: {snippet.publishedAt}</span>
        </Card.Meta>
        <Card.Description>{snippet.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button as='div' labelPosition='right'>
         <Button icon>
           <Icon name='fire' />
           Save
         </Button>
         <Label as='a' basic pointing='left'>
          0
         </Label>
       </Button>
      </Card.Content>
    </Card>
  )
}

export default Tutorial
