import React, { Fragment, Component } from 'react';
import { Image, Header, Icon, Button, List } from 'semantic-ui-react';
import { updateLikes } from '../store/actions/index';


class Comment extends Component {
  state = {
    likes: this.props.comment.like_count
  }

  handleLike = () => {
    this.setState({likes: this.state.likes + 1}, () => updateLikes(this.props.comment.id, this.state.likes))
  }
  render() {
    console.log(this.props);
    return(
      <Fragment>
        <List.Item>
          <Image avatar src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
          <List.Content>
            <List.Header >{this.props.comment.user.username}</List.Header>
            <List.Description>
              <Icon name="heart" color="red" onClick={this.handleLike}/>
              <h4 className="like-text">{this.state.likes} likes </h4> {this.props.comment.content}
            </List.Description>
          </List.Content>
        </List.Item>
      </Fragment>
    )
  }

}

export default Comment


// <Header as='h3'>
//   <Image circular src='https://react.semantic-ui.com/images/avatar/large/patrick.png' /><br/>
//
//   {this.props.comment.content} {this.state.likes} likes
//   <Button onClick={this.handleLike}><Icon name='heart' color="red" /></Button>
//
// </Header>
