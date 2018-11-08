import React from 'react';
import { Card, Icon, Button, Label, Header, Modal } from 'semantic-ui-react';

const Tutorial = (props) => {
  console.log(props.tutorial);
  const { id, snippet } = props.tutorial
  const videoUrl = `http://www.youtube.com/embed/${id.videoId}`;
  return (
    <Card>
      <Modal trigger={<img src={snippet.thumbnails.medium.url} alt="" />} basic size='small'>
        <Header icon='archive' content={snippet.title} />
        <div className="responsive">
          <iframe width="560" height="315" src={`${videoUrl}?rel=0&autoplay=1`} frameBorder="0" allowFullScreen></iframe>
        </div>
        <Modal.Actions>
          <Button basic color='grey' inverted>
            <Icon name='remove' /> Save
          </Button>
        </Modal.Actions>
      </Modal>

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
       </Button>
      </Card.Content>
    </Card>
  )
}

export default Tutorial
