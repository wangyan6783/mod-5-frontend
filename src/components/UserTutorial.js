import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Card, Icon, Button, Header, Modal } from 'semantic-ui-react';
import { YoutubeAPIKey } from '../secretKeys';

class UserTutorial extends Component {

  state = {
    thumbnail: "",
    title: "",
    videoUrl: "",
    publishedAt: "",
    description: ""
  }

  componentDidMount(){
    fetch(`https://www.googleapis.com/youtube/v3/videos?id=${this.props.tutorial.video_id}&key=${YoutubeAPIKey}&part=snippet,contentDetails,statistics,status`)
    .then(response => response.json())
    .then(video => this.setState({
      thumbnail: video.items[0].snippet.thumbnails.medium.url,
      title: video.items[0].snippet.title,
      videoUrl: `http://www.youtube.com/embed/${this.props.tutorial.video_id}?rel=0&autoplay=1`,
      publishedAt: video.items[0].snippet.publishedAt.split("T")[0],
      description: video.items[0].snippet.description
    }))
  }

  render() {
    const {thumbnail, title, videoUrl, publishedAt, description} = this.state
    return (
      <Card>
        <Modal trigger={<img src={thumbnail} alt="" />} basic size='small'>
          <Header icon='archive' content={title} />
          <div className="responsive">
            <iframe title={title} width="560" height="315" src={videoUrl} frameBorder="0" allowFullScreen></iframe>
          </div>
        </Modal>

        <Card.Content>
          <Card.Header>{title}</Card.Header>
          <Card.Meta>
            <span className='date'>Published at: {publishedAt}</span>
          </Card.Meta>

        </Card.Content>
      </Card>
    )
  }
}

export default UserTutorial;
