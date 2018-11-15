import React, { Component, Fragment } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { fetchCurrentUser } from '../store/actions/index';

class NavBar extends Component {
  state = { activeItem: '/home' }

  componentDidMount(){
    if (localStorage.getItem('jwt') && !this.props.user) this.props.fetchCurrentUser()
  }

  handleItemClick = (e, {name}) => {
    this.setState({ activeItem: name })
    if (name === "/logout"){
      localStorage.removeItem("jwt");
      window.location.href = "http://localhost:3000/";
    }
    this.props.history.push(`${name}`)
  }

  renderLoginProfile = () => {
    const { activeItem } = this.state
    if (this.props.user) {
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

  renderUserName = () => {
    if (this.props.user) {
      return (
        <Menu.Item
          name={`Welcome ${this.props.user.username}`}
          position="right"/>
      )
    } else {
      return null;
    }
  }

  render() {
    const { activeItem } = this.state

    console.log(this.props.user)
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
            {this.renderUserName()}
        </Menu>
      </Segment>
    )
  }
}

const mapStateToProps = state => ({
  user: state.userReducer.user
})

export default withRouter(connect(mapStateToProps, { fetchCurrentUser })(NavBar));
