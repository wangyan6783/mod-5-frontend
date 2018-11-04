import React, { Fragment } from 'react';

const Comment = (props) => {
    return(
      <Fragment>
        <p>{props.comment.content}   {props.comment.like_count} likes</p>
       </Fragment>
    )

}

export default Comment
