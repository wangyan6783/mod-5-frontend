import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Card, Icon, Button, Header, Modal, Popup } from 'semantic-ui-react';
import { saveTutorial } from '../store/actions/index';

class Tutorial extends Component {

  state = {
    buttonText: "Save",
    buttonColor: "grey"
  }

  handleSave = () => {
    if (this.props.user) {
      saveTutorial(this.props.tutorial.id.videoId, this.props.user.id)
      this.setState({
        buttonText: "Saved",
        buttonColor: "red"
      })
    }
  }

  renderSaveBtn = () => {
    if (!this.props.user) {
      // if user is not logged in
      return (
        <Popup trigger={<Button basic color='grey' inverted><Icon name='remove' />Save</Button>} content="Please login to save this video!" />
      )
    } else if (this.props.user.tutorials.find(tutorial => tutorial.video_id === this.props.tutorial.id.videoId)) {
      // current user already saved this video
      return (
        <Button basic color="red" inverted>
          <Icon name='fire' /> Saved
        </Button>
      )
    } else {
      // logged in but haven't saved this video
      return (
        <Button onClick={this.handleSave} basic color={this.state.buttonColor} inverted>
          <Icon name='remove' /> {this.state.buttonText}
        </Button>
      )
    }
  }

  render() {
    const { id, snippet } = this.props.tutorial
    const videoUrl = `http://www.youtube.com/embed/${id.videoId}`;
    return (
      <Card>
        <Modal trigger={<img src={snippet.thumbnails.medium.url} alt="" />} basic size='small'>
          <Header icon='archive' content={snippet.title} />
          <div className="responsive">
            <iframe width="560" height="315" src={`${videoUrl}?rel=0&autoplay=1`} frameBorder="0" allowFullScreen></iframe>
          </div>
          <Modal.Actions>
            {this.renderSaveBtn()}
          </Modal.Actions>
        </Modal>

        <Card.Content>
          <Card.Header>{snippet.title}</Card.Header>
          <Card.Meta>
            <span className='date'>Published at: {snippet.publishedAt}</span>
          </Card.Meta>
          <Card.Description>{snippet.description}</Card.Description>
        </Card.Content>
      </Card>
    )
  }
}

const mapStateToProps = state => ({
  user: state.userReducer.user
})

export default connect(mapStateToProps)(Tutorial);
