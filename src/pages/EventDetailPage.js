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
        {event.title}
        {event.description}
      </Fragment>
    )
  }
}

export default ResortDetailPage
