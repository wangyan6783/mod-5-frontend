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
    return(
      <Fragment>
        <List.Item>
          <Image avatar src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
          <List.Content>
            <List.Header as='a'>Elliot Fu</List.Header>
            <List.Description>
              {this.state.likes} likes {this.props.comment.content}
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
