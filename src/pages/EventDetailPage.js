import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Button, Popup } from 'semantic-ui-react';
import { addUserEvent, deleteUserEvent } from '../store/actions/index';
import CommentContainer from '../components/CommentContainer';

class ResortDetailPage extends Component {

  state = {
    event: {},
    going: false
  }

  componentDidMount(){
    fetch(`http://localhost:3001/api/v1/events/${this.props.match.params.id}`)
    .then(response => response.json())
    .then(event => {
      if (this.props.user && event.users.find(user => user.id === this.props.user.id)) {
        this.setState({
          event,
          going: true
        })
      } else {
        this.setState({
          event,
          going: false
        })
      }
    })
  }

  getUserEventId = () => {
    const userEvent = this.state.event.user_events.find(userEvent => userEvent.user_id === this.props.user.id)
    if (userEvent) {
      return userEvent.id
    } else {
      return null
    }
  }

  handleGoing = () => {
    if (this.props.user) {
      if (this.state.going) {
        deleteUserEvent(this.getUserEventId())
        this.setState({
          going: !this.state.going,
          event: {...this.state.event, users: this.state.event.users.filter(user => user.id !== this.props.user.id)}
        })
      } else {
        addUserEvent(this.state.event.id, this.props.user.id)
        this.setState({
          going: !this.state.going,
          event: {...this.state.event, users: [...this.state.event.users, { id: this.props.user.id }]}
        })
        // this.props.history.push(`/events/${this.props.match.params.id}`)
      }
    }
  }

  renderGoingButton = () => {
    const { going } = this.state
    if (this.props.user) {
      return <Button onClick={this.handleGoing}>{going ? "No :(" : "Yes!" }</Button>
    } else {
      return <Popup trigger={<Button onClick={this.handleGoing}>{going ? "No :(" : "Yes!" }</Button>} content="Please login to join this event!" />
    }
  }

  render() {
    const { event } = this.state
    return (
      <Fragment>
        <h1>{event.title}</h1>
        <img src={event.image_url} alt="" height="400px" width="500px" />
        <p>{event.date}</p>
        <p>{event.description}</p>
        {event.users ? <p>{event.users.length} skiers and snowboarders going</p> : null}
        <h2>Are you going?</h2>
        {this.renderGoingButton()}
        {event.comments ? <CommentContainer event={event}/> : null}
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  user: state.userReducer.user
})

export default connect(mapStateToProps)(ResortDetailPage)
