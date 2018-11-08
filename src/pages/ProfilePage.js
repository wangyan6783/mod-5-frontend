import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, TextArea, Form } from 'semantic-ui-react';
import withAuth from '../hocs/withAuth';
import { addBio } from '../store/actions/index';

class ProfilePage extends Component {
  state = {
    showBioButton: true,
    showBioInput: false,
    bio: ""
  }

  showBioInput = () => {
    this.setState({
      showBioButton: false,
      showBioInput: true
    })
  }

  renderBioButton = () => {
    if (this.props.bio) {
      return this.props.bio;
    } else if (this.state.showBioButton) {
      return <Button onClick={this.showBioInput}>Add a bio</Button>;
    } else {
      return null;
    }
  }

  handleBioInput = (e, data) => {
    this.setState({bio: data.value})
  }

  handleAddBio = () => {
    this.props.addBio(this.props.userId, this.state.bio)
    this.setState({
      showBioInput: false
    })
  }

  render(){
    return (
      <Fragment>
        <h2>{this.props.username}</h2>
        <img src='https://cdn1.vectorstock.com/i/1000x1000/73/15/female-avatar-profile-icon-round-woman-face-vector-18307315.jpg' alt="" height="300px" width="300px" />
        {this.props.avatar}
        <p>{this.renderBioButton()}</p>
        {this.state.showBioInput ?
          <Fragment>
            <Form onSubmit={this.handleAddBio}>
              <TextArea onChange={this.handleBioInput} value={this.state.bio} autoHeight placeholder='Add a bio' rows={2} />
              <Button>Submit</Button>
            </Form>
          </Fragment> : null}

      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.userReducer.user.id,
  avatar: state.userReducer.user.avatar,
  username: state.userReducer.user.username,
  bio: state.userReducer.user.bio
})

export default withAuth(connect(mapStateToProps, { addBio })(ProfilePage));
