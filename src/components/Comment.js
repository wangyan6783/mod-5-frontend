import React, { Fragment, Component } from 'react';
import { Image, Header, Icon, Button } from 'semantic-ui-react';
import { updateLikes } from '../store/actions/index';


class Comment extends Component {
  state = {
    likes: this.props.comment.like_count
  }

  handleLike = () => {
    this.setState({likes: this.state.likes + 1}, () => updateLikes(this.props.comment.id, this.state.likes))
  }
  render() {
    return(
      <Fragment>
        <Header as='h3'>
          <Image circular src='https://react.semantic-ui.com/images/avatar/large/patrick.png' /><br/>

          {this.props.comment.content} {this.state.likes} likes
          <Button onClick={this.handleLike}><Icon name='heart' color="red" /></Button>
          
        </Header>
      </Fragment>
    )
  }

}

export default Comment
