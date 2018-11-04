import React, { Fragment, Component } from 'react';
import CommentForm from './CommentForm';
import Comment from './Comment';

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
        <h3>Comments</h3>
        {this.state.comments.map(comment => <Comment key={comment.id} comment={comment}/>)}
        <CommentForm addComment={this.addComment} eventId={this.props.event.id}/>
      </Fragment>
    )
  }

}

export default CommentContainer
