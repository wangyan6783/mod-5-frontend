import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import { withRouter } from 'react-router';

class NavBar extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
    if (e.target.innerText === "Logout"){
      window.location.href = "http://localhost:3000/"
    }
    this.props.history.push(`${name}`)
  }

  render() {
    const { activeItem } = this.state

    return (
      <Segment inverted>
        <Menu inverted pointing secondary>
            <Menu.Item
            name='/home'
            active={activeItem === 'home'}
            onClick={this.handleItemClick} />
            <Menu.Item
            name='/resorts'
            active={activeItem === 'resorts'}
            onClick={this.handleItemClick} />
            <Menu.Item
              name='/events'
              active={activeItem === 'events'}
              onClick={this.handleItemClick} />
            <Menu.Item
            name='/login'
            active={activeItem === 'login/signup'}
            onClick={this.handleItemClick} />
            <Menu.Item
            name='/logout'
            active={activeItem === 'logout'}
            onClick={this.handleItemClick} />
        </Menu>
      </Segment>
    )
  }
}

export default withRouter(NavBar)
