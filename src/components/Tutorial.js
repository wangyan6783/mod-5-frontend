import React from 'react';
import { connect } from 'react-redux'
import { Card, Icon, Button, Label, Header, Modal, Popup } from 'semantic-ui-react';
import { saveTutorial } from '../store/actions/index';

const Tutorial = (props) => {

  const handleSave = () => {
    if (props.user) {
      saveTutorial(id.videoId, props.user.id)
    }
  }

  const renderSaveBtn = () => {
    if (props.user){
      return (
        <Button onClick={handleSave} basic color='grey' inverted>
          <Icon name='remove' /> Save
        </Button>
      )
    } else {
      return (
        <Popup trigger={<Button onClick={e => saveTutorial(id.videoId, )} basic color='grey' inverted><Icon name='remove' />Save</Button>} content="Please login to save this video!" />
      )
    }
  }

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
          {renderSaveBtn()}
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

const mapStateToProps = state => ({
  user: state.userReducer.user
})

export default connect(mapStateToProps)(Tutorial);
