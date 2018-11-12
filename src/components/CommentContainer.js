import React, { Fragment, Component } from 'react';
import CommentForm from './CommentForm';
import Comment from './Comment';
import { List } from 'semantic-ui-react';

class CommentContainer extends Component {
  state = {
    comments: this.props.event.comments
  }

  addComment = (comment) => {
    this.setState({
      comments: [...this.state.comments, comment]
    })
  }

  render(){
    return(
      <Fragment>
        <h2>Comments</h2>
        <List relaxed='very' animated>
          {this.state.comments.map(comment => <Comment key={comment.id} comment={comment}/>)}
        </List>
        <CommentForm addComment={this.addComment} eventId={this.props.event.id}/>
      </Fragment>
    )
  }

}

export default CommentContainer
