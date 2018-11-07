import React, { Component, Fragment } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { fetchCurrentUser } from '../store/actions/index';

class NavBar extends Component {
  state = { activeItem: '/home' }

  componentDidMount(){
    if (localStorage.getItem('jwt') && !this.props.loggedIn) this.props.fetchCurrentUser()
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
    if (e.target.innerText === "Logout"){
      localStorage.removeItem("jwt");
      window.location.href = "http://localhost:3000/";
    }
    this.props.history.push(`${name}`)
  }

  renderLoginProfile = () => {
    const { activeItem } = this.state
    if (this.props.loggedIn) {
      return (
        <Fragment>
          <Menu.Item
            name='/profile'
            active={activeItem === '/profile'}
            onClick={this.handleItemClick} />
          <Menu.Item
            name='/logout'
            active={activeItem === '/logout'}
            onClick={this.handleItemClick} />
        </Fragment>
      )
    } else {
      return (
        <Menu.Item
          name='/login'
          active={activeItem === '/login'}
          onClick={this.handleItemClick} />
      )
    }
  }

  render() {
    const { activeItem } = this.state

    return (
      <Segment inverted>
        <Menu inverted pointing secondary>
            <Menu.Item
            name='/home'
            active={activeItem === '/home'}
            onClick={this.handleItemClick} />
            <Menu.Item
            name='/resorts'
            active={activeItem === '/resorts'}
            onClick={this.handleItemClick} />
            <Menu.Item
              name='/events'
              active={activeItem === '/events'}
              onClick={this.handleItemClick} />
            <Menu.Item
              name='/tutorials'
              active={activeItem === '/tutorials'}
              onClick={this.handleItemClick} />
            {this.renderLoginProfile()}
        </Menu>
      </Segment>
    )
  }
}

const mapStateToProps = state => ({
  loggedIn: state.userReducer.loggedIn
})

export default withRouter(connect(mapStateToProps, { fetchCurrentUser })(NavBar));
