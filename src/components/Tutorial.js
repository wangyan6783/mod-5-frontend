import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Card, Icon, Button, Header, Modal, Popup } from 'semantic-ui-react';
import { saveTutorial } from '../store/actions/index';
import youtubePlay from '../images/youtube-play.png';

class Tutorial extends Component {

  handleSave = () => {
    if (this.props.user) {
      this.props.saveTutorial(this.props.tutorial.id.videoId, this.props.user.id)
    }
  }

  renderSaveBtn = () => {
    if (!this.props.user) {
      // if user is not logged in
      return (
        <Popup trigger={<Button basic color='grey' inverted><Icon name='envelope open outline' />Save</Button>} content="Please login to save this video!" />
      )
    } else if (this.props.user.tutorials.find(tutorial => tutorial.video_id === this.props.tutorial.id.videoId)) {
      // current user already saved this video
      return (
        <Button color='youtube'>
          <Icon name='envelope outline' /> Saved
        </Button>
      )
    } else {
      // logged in but haven't saved this video
      return (
        <Button onClick={this.handleSave} basic color="grey" inverted>
          <Icon name='envelope open outline' /> Save
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
        <Modal trigger={this.renderThumbnail()} basic size='small'>
          <Header><h2 className="text-center"><Icon name='youtube play' />{snippet.title}</h2></Header>
          <div className="responsive">
            <iframe title={id} width="560" height="315" src={videoUrl} frameBorder="0" allowFullScreen></iframe>
          </div>
          <Modal.Actions>
            <div className="tutorial-save-button">
              {this.renderSaveBtn()}
            </div>
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

export default connect(mapStateToProps, { saveTutorial })(Tutorial);

  // const thumbnails = [ "https://res.cloudinary.com/dfosmeuuq/image/upload/v1542296723/Tutorial%20Thumbnails/Screen_Shot_2018-11-15_at_10.39.57_AM.png", "https://res.cloudinary.com/dfosmeuuq/image/upload/v1542296723/Tutorial%20Thumbnails/Screen_Shot_2018-11-15_at_10.43.45_AM.png", "https://res.cloudinary.com/dfosmeuuq/image/upload/v1542296369/Tutorial%20Thumbnails/Screen_Shot_2018-11-15_at_10.32.12_AM.png", "https://res.cloudinary.com/dfosmeuuq/image/upload/v1542296367/Tutorial%20Thumbnails/Screen_Shot_2018-11-15_at_10.29.57_AM.png", "https://res.cloudinary.com/dfosmeuuq/image/upload/v1542296367/Tutorial%20Thumbnails/Screen_Shot_2018-11-15_at_10.19.45_AM.png", "https://res.cloudinary.com/dfosmeuuq/image/upload/v1542296367/Tutorial%20Thumbnails/Screen_Shot_2018-11-15_at_10.21.19_AM.png", "https://res.cloudinary.com/dfosmeuuq/image/upload/v1542296366/Tutorial%20Thumbnails/Screen_Shot_2018-11-15_at_10.16.52_AM.png", "https://res.cloudinary.com/dfosmeuuq/image/upload/v1542296366/Tutorial%20Thumbnails/Screen_Shot_2018-11-15_at_10.15.22_AM.png", "https://res.cloudinary.com/dfosmeuuq/image/upload/v1542296366/Tutorial%20Thumbnails/Screen_Shot_2018-11-15_at_10.13.46_AM.png", "https://res.cloudinary.com/dfosmeuuq/image/upload/v1542303692/Tutorial%20Thumbnails/Screen_Shot_2018-11-15_at_12.33.58_PM.png", "https://res.cloudinary.com/dfosmeuuq/image/upload/v1542303692/Tutorial%20Thumbnails/Screen_Shot_2018-11-15_at_12.39.47_PM.png", "https://res.cloudinary.com/dfosmeuuq/image/upload/v1542303692/Tutorial%20Thumbnails/Screen_Shot_2018-11-15_at_12.38.09_PM.png", "https://res.cloudinary.com/dfosmeuuq/image/upload/v1542303692/Tutorial%20Thumbnails/Screen_Shot_2018-11-15_at_12.35.48_PM.png", "https://res.cloudinary.com/dfosmeuuq/image/upload/v1542303692/Tutorial%20Thumbnails/Screen_Shot_2018-11-15_at_12.27.43_PM.png", "https://res.cloudinary.com/dfosmeuuq/image/upload/v1542303694/Tutorial%20Thumbnails/Screen_Shot_2018-11-15_at_12.29.20_PM.png"]
  //
  // <div className="tutorial-thumbnail" style={{backgroundImage: `url(${thumbnails[Math.floor(Math.random()*thumbnails.length)]})`}}>
