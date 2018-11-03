import React, { Fragment, Component } from 'react';
import { Button } from 'semantic-ui-react';
import { addUserEvent } from '../store/actions/index';

class ResortDetailPage extends Component {

  state = {
    event: {},
    going: false
  }

  componentDidMount(){
    fetch(`http://localhost:3001/api/v1/events/${this.props.match.params.id}`)
    .then(response => response.json())
    .then(event => {
      if (event.users.find(user => user.id === 105)) {
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

  handleGoing = () => {
    if (this.state.going) {
      this.setState({
        going: !this.state.going,
        event: {...this.state.event, users: this.state.event.users.filter(user => user.id !== 105)}
      })
    } else {
      addUserEvent(this.state.event.id)
      this.setState({
        going: !this.state.going,
        event: {...this.state.event, users: [...this.state.event.users, { id: 105 }]}
      })

    }
  }

  render() {
    const { event, going } = this.state
    return (
      <Fragment>
        <h1>{event.title}</h1>
        <img src={event.image_url} alt="" height="400px" width="600px" />
        <p>{event.date}</p>
        <p>{event.description}</p>
        {event.users ? <p>{event.users.length} Skiers Going</p> : null}
        <h2>Are you going?</h2>
        <Button onClick={this.handleGoing}>{going ? "No :(" : "Yes!" }</Button>
      </Fragment>
    )
  }
}

export default ResortDetailPage
