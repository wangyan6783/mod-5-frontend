import React, { Fragment, Component } from 'react';
import { Segment, Input, Button, Form } from 'semantic-ui-react';

class ChatContainer extends Component {
  state = {
    message: ""
  }

  handleChange = (e, data) => {
    this.setState({message: data.value})
  }

  handleSubmit = () => {
    
  }

  render(){
    return (
      <div className="chat-container">
        <Segment.Group>
           <Segment><h3>{this.props.event.title} Chat Room</h3></Segment>
           <div className="chat-list">
             <p className="text-left">yan: hello</p>
             <p className="text-right">Yicheng: hello</p>
             <p className="text-right">Yicheng: hello</p>
             <p className="text-right">Yicheng: hello</p>
           </div>
           <Segment clearing>
             <Form onSubmit={this.handleSubmit}>
                <Input onChange={this.handleChange} />
                <Button type="submit" floated='right'>send</Button>
              </Form>
            </Segment>
         </Segment.Group>
       </div>
    )
  }
}

export default ChatContainer
