import React, { Fragment, Component } from 'react';
import { Image, Icon, List } from 'semantic-ui-react';
import { updateLikes } from '../store/actions/index';


class Comment extends Component {
  state = {
    likes: this.props.comment.like_count
  }

  handleLike = () => {
    this.setState({likes: this.state.likes + 1}, () => updateLikes(this.props.comment.id, this.state.likes))
  }
  render(){
    return(
      <Fragment>
        <List.Item>
          <List.Content>
            <Image avatar size="mini" src={this.props.comment.user.avatar} />
            <List.Header><h3 className="margin-text">{this.props.comment.user.username}</h3>
              <Icon name="heart" color="red" size="large" onClick={this.handleLike}/>
              <h3 className="inline-text">{this.state.likes} likes </h3>
            </List.Header>
            <List.Description>
              <h4 className="inline-text">{this.props.comment.content}</h4>
            </List.Description>
          </List.Content>
        </List.Item>
      </Fragment>
    )
  }

}

export default Comment
