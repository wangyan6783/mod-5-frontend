import React, { Fragment, Component } from 'react';
import ResortEvents from '../components/ResortEvents';

class ResortDetailPage extends Component {

  state = {
    resort: {},
    showEvents: false
  }

  componentDidMount(){
    fetch(`http://localhost:3001/api/v1/resorts/${this.props.match.params.id}`)
    .then(response => response.json())
    .then(resort => this.setState({resort}))
  }

  showEvents = () => {
    this.setState({showEvents: true})
  }

  render(){
    console.log(this.state.resort)
    const { resort } = this.state
    return (
      <Fragment>
        <h1>{resort.name}</h1>
        <img src="https://www.telegraph.co.uk/content/dam/Travel/ski/Gear/All-mountain-skis.jpg?imwidth=1240" alt="" height="500px" width="760px" />
        <br/>
        <button onClick={this.showEvents}>Upcoming Events</button>
        <button>Create an Event</button>
        {this.state.showEvents ? <ResortEvents events={resort.events} /> : null}
      </Fragment>
    )
  }
}

export default ResortDetailPage
