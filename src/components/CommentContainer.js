import React, { Fragment } from 'react';
import CommentForm from './CommentForm';

const CommentContainer = (props) => {
    return(
      <Fragment>
          <h3>Comments</h3>
          <CommentForm />
       </Fragment>
    )

}

export default CommentContainer
