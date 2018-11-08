import React, { Fragment, Component } from 'react';
import ResortEvents from '../components/ResortEvents';
import NewEventForm from '../components/NewEventForm';
import { Button, Header, Modal, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class ResortDetailPage extends Component {

  state = {
    resort: {},
    open: false
  }

  componentDidMount(){
    fetch(`http://localhost:3001/api/v1/resorts/${this.props.match.params.id}`)
    .then(response => response.json())
    .then(resort => this.setState({resort}))
  }

  showEvents = () => {
    this.setState({open: true})
  }

  closeEvents = () => {
    this.setState({ open: false })
  }

  renderModal = () => {
    if (this.props.loggedIn) {
      return (
        <Fragment>
          <Header icon='archive' content='Create a new event' />
          <Modal.Content>
            <NewEventForm resortId={this.props.match.params.id} hostId={this.props.user.id} />
          </Modal.Content>
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <Header icon='archive' content='Please login to create an event' />
          <Modal.Actions>
            <Link to='/login'>
              <Button color='grey' inverted>
                <Icon name='checkmark' /> Login
              </Button>
            </Link>
            <Link to='/signup'>
              <Button color='grey' inverted>
                <Icon name='checkmark' /> Signup
              </Button>
            </Link>
          </Modal.Actions>
        </Fragment>
      )
    }
  }

  render(){
    const { resort, open } = this.state
    return (
      <Fragment>
        <h1>{resort.name}</h1>
        <img src="https://www.telegraph.co.uk/content/dam/Travel/ski/Gear/All-mountain-skis.jpg?imwidth=1240" alt="" height="300px" width="500px" />
        <br/>
        <Button onClick={this.showEvents}>Upcoming Events</Button>
        <Modal dimmer="blurring" open={open} onClose={this.closeEvents}>
          <Modal.Header>Upcoming Events</Modal.Header>
          <ResortEvents events={resort.events}/>
        </Modal>

        <Modal trigger={<Button>Create an Event</Button>} basic size="small">
          {this.renderModal()}
        </Modal>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  loggedIn: state.userReducer.loggedIn,
  user: state.userReducer.user
})

export default connect(mapStateToProps)(ResortDetailPage);
