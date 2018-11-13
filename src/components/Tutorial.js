import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Card, Icon, Button, Header, Modal, Popup } from 'semantic-ui-react';
import { saveTutorial } from '../store/actions/index';
import youtubePlay from '../images/youtube-play.png';

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

  renderThumbnail = () => {
    return (

        <div className="tutorial-thumbnail" style={{backgroundImage: `url(${this.props.tutorial.snippet.thumbnails.medium.url})`}}>
          <div className="tutorial-thumbnail-overlay"></div>
          <img src={youtubePlay} className="youtube-play" alt="" />
        </div>

    )
  }

  render() {
    const { id, snippet } = this.props.tutorial
    const videoUrl = `http://www.youtube.com/embed/${id.videoId}?rel=0&autoplay=1`;
    return (
      <Card>
        <Modal trigger={this.renderThumbnail()} dimmer="blurring" basic size='small'>
          <Header><h2 className="text-center"><Icon name='youtube play' />{snippet.title}</h2></Header>
          <div className="responsive">
            <iframe title={id} width="560" height="315" src={videoUrl} frameBorder="0" allowFullScreen></iframe>
          </div>
          <Modal.Actions>
            {this.renderSaveBtn()}
          </Modal.Actions>
        </Modal>

        <Card.Content>
          <Card.Header>{snippet.title}</Card.Header>
          <Card.Meta>
            <span className='date'>Published on: {snippet.publishedAt.split("T")[0]}</span>
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

// <img src={snippet.thumbnails.medium.url} alt="" />
