import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Segment, Input, Button, Form} from 'semantic-ui-react';
import Chatkit from '@pusher/chatkit-client';
import {instanceLocator, tokenUrl} from '../secretKeys';

class ChatContainer extends Component {
  state = {
    currentUser: {},
    message: "",
    messages: []
  }

  componentDidMount() {
    console.log(this.props.event)
    const chatManager = new Chatkit.ChatManager({
      instanceLocator,
      userId: this.props.user.username,
      tokenProvider: new Chatkit.TokenProvider({url: tokenUrl})
    })

    chatManager.connect().then(currentUser => {
      this.setState({currentUser})
      currentUser.subscribeToRoom({
        roomId: this.props.event.chat_room_id,
        hooks: {
          onMessage: message => {
            this.setState({
              messages: [
                ...this.state.messages,
                message
              ]
            }, () => console.log(this.state.messages))
          }
        }
      })
    }).catch(error => console.error(error))
  }

  handleChange = (e, data) => {
    this.setState({message: data.value})
  }

  handleSubmit = () => {
    debugger
    this.state.currentUser.sendMessage({text: this.state.message, roomId: this.props.event.chat_room_id})
    this.setState({message: ""})
  }

  textPosition = (message) => {
    if (message.senderId === this.props.user.username) {
      return "text-left";
    } else {
      return "text-right";
    }
  }

  render() {
    return (<div className="chat-container">
      <Segment.Group>
        <Segment>
          <h3>{this.props.event.title}
            Chat Room</h3>
        </Segment>
        <div className="chat-list">
          <p className="text-left">Yan: Hi {this.props.user.username}</p>
          <p className="text-right">Wang: Welcome!</p>
          {this.state.messages.map(message => <p key={message.id} className={this.textPosition(message)}>{message.senderId}: {message.text}</p>)}
        </div>
        <Segment clearing="clearing">
          <Form onSubmit={this.handleSubmit}>
            <Input onChange={this.handleChange} value={this.state.message}/>
            <Button secondary="secondary" type="submit" floated='right'>Send</Button>
          </Form>
        </Segment>
      </Segment.Group>
    </div>)
  }
}

const mapStateToProps = state => ({user: state.userReducer.user})

export default connect(mapStateToProps)(ChatContainer)
