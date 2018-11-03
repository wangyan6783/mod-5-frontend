import React, { Fragment, Component } from 'react';

class ResortDetailPage extends Component {

  state = {
    event: {}
  }

  componentDidMount(){
    fetch(`http://localhost:3001/api/v1/events/${this.props.match.params.id}`)
    .then(response => response.json())
    .then(event => this.setState({event}))
  }

  render() {
    const { event } = this.state
    return (
      <Fragment>
        <h1>{event.title}</h1>
        {event.image_url}
        <p>{event.description}</p>
      </Fragment>
    )
  }
}

export default ResortDetailPage
