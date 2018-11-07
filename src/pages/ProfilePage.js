import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import withAuth from '../hocs/withAuth';

const ProfilePage = (props) => {
  return (
    <Fragment>
      {props.avatar}
      {props.username}
      {props.bio}
    </Fragment>
  )
}

const mapStateToProps = state => ({
  avatar: state.userReducer.user.avatar,
  username: state.userReducer.user.username,
  bio: state.userReducer.user.bio
})

export default withAuth(connect(mapStateToProps)(ProfilePage));
