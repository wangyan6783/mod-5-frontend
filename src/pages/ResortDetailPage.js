import React, { Fragment, Component } from 'react';
import ResortEvents from '../components/ResortEvents';
import NewEventForm from '../components/NewEventForm';
import { Button, Modal, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { backendEndpoint } from '../secretKeys';

class ResortDetailPage extends Component {

  state = {
    resort: {}
  }

  componentDidMount(){
    fetch(`${backendEndpoint}/resorts/${this.props.match.params.id}`)
    .then(response => response.json())
    .then(resort => this.setState({resort}))
  }

  renderModal = () => {
    if (this.props.loggedIn) {
      return (
        <div className="new-event">
          <Modal.Header><h2 className="text-center">Create an event</h2></Modal.Header>

          <Modal.Content>
            <NewEventForm resortId={this.props.match.params.id} hostId={this.props.user.id} />
          </Modal.Content>
        </div>
      )
    } else {
      return (
        <div className="new-event-login">
            <Modal.Header icon='angle double right'><h2 className="text-center">Please login to create an event</h2></Modal.Header>
            <div className="new-event-login-btn-container">
            <Modal.Actions>
              <Link to='/login'>
                <Button basic color="grey" inverted>
                  <Icon name='checkmark' /> Login
                </Button>
              </Link>
              <Link to='/signup'>
                <Button basic color="grey" inverted>
                  <Icon name='checkmark' /> Signup
                </Button>

              </Link>
            </Modal.Actions>
          </div>

        </div>
      )
    }
  }

  render(){
    const { resort } = this.state
    return (
      <Fragment>
        <div id="resort-detail-page">
          <h1>{resort.name}</h1>
          <img src={resort.image_url} alt="" height="500px" width="760px" />
          <Modal dimmer="blurring" trigger={<Button onClick={this.showEvents} secondary className="detail-button">Upcoming Events</Button>}>
            <Modal.Header><h1>Upcoming Events</h1></Modal.Header>
            <Modal.Content>
            <ResortEvents events={resort.events}/>
            </Modal.Content>
          </Modal>
          <Modal trigger={<Button secondary className="detail-button">Create an Event</Button>} basic size="small">
            {this.renderModal()}
          </Modal>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  loggedIn: state.userReducer.loggedIn,
  user: state.userReducer.user
})

export default connect(mapStateToProps)(ResortDetailPage);

// <Header icon='archive' content='Create an event' />
