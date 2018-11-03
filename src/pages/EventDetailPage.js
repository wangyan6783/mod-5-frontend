import React, { Fragment, Component } from 'react';
import { Button } from 'semantic-ui-react';

class ResortDetailPage extends Component {

  state = {
    event: {},
    going: false
  }

  componentDidMount(){
    fetch(`http://localhost:3001/api/v1/events/${this.props.match.params.id}`)
    .then(response => response.json())
    .then(event => this.setState({event}))
  }

  handleGoing = () => {
    if (this.state.going) {
      this.setState({
        going: !this.state.going,
        event: {...this.state.event, users: this.state.event.users.filter(user => user.id !== 1)}
      })
    } else {
      this.setState({
        going: !this.state.going,
        event: {...this.state.event, users: [...this.state.event.users, { id: 1 }]}
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

//
