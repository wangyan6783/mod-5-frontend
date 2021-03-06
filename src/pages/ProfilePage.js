import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, TextArea, Form, Image } from 'semantic-ui-react';
import withAuth from '../hocs/withAuth';
import { addBio } from '../store/actions/index';
import UserEvents from '../components/UserEvents';
import UserTutorials from '../components/UserTutorials';
import changeProfilePhoto from '../images/change-profile-photo.png';
import { updateProfilePhoto } from '../store/actions/index';

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

  handleBioInput = (e, data) => {
    this.setState({bio: data.value})
  }

  handleAddBio = () => {
    this.props.addBio(this.props.user.id, this.state.bio)
    this.setState({
      showBioInput: false
    })
  }

  handleChange= (event) => {
    this.props.updateProfilePhoto(this.props.user.id, event.target.files[0])
  }

  renderAvatar = () => {
    return (
      <label htmlFor="file-upload">
        <div className="profile-container">
          <Image className="profile-image" size="medium" circular src={this.props.user.avatar} arl="" />
          <div className="profile-overlay overlay-fade">
            <Image className="overlay-image" size="medium" circular src={changeProfilePhoto} arl="" onClick={this.handleClick} />
          </div>
        </div>
        <input id="file-upload" type="file" onChange={this.handleChange} />
      </label>
    )
  }

  renderBioButton = () => {
    if (this.props.user.bio) {
      return (
        <div className="bio-text">
          <h2>Bio</h2>
          <h4>{this.props.user.bio}</h4>
        </div>
      )
    } else if (this.state.showBioButton) {
      return <Button secondary onClick={this.showBioInput}>Add a bio</Button>;
    } else {
      return null;
    }
  }

  render(){
    return (
      <Fragment>
        <div className="page-margin">
          <h1>{this.props.user.username}</h1>
          {this.renderAvatar()}
          <div className="bio-button">{this.renderBioButton()}</div>
          {this.state.showBioInput ?
            <Fragment>
              <Form className="bio-form" onSubmit={this.handleAddBio}>
                <TextArea onChange={this.handleBioInput} value={this.state.bio} autoHeight placeholder='Add a bio' rows={2} />
                <Button secondary>Submit</Button>
              </Form>
            </Fragment> : null}
            <h2 className="text-margin">My Events</h2>
            <UserEvents events={this.props.user.events}/>
            <h2 className="text-margin">Saved Tutorials</h2>
            <UserTutorials tutorials={this.props.user.tutorials}/>
          </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  user: state.userReducer.user
})

export default withAuth(connect(mapStateToProps, { addBio, updateProfilePhoto })(ProfilePage));
