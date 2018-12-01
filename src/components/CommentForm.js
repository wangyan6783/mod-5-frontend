import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Form, Button, TextArea, Label, Popup } from 'semantic-ui-react'
import { backendEndpoint } from '../secretKeys';


class CommentForm extends Component {

  renderInputField = (field) => {
    return (
      <Form.Field>
        <label>{field.label}</label>
        <TextArea type={field.type} style={{width: '45%'}} {...field.input} />
        <br/>
        {field.meta.touched && field.meta.error ? <Label basic color='red' pointing> {field.meta.error}</Label> : ""}
      </Form.Field>
    )
  }

  onSubmit = (values) => {
    if (this.props.user) {
      fetch(`${backendEndpoint}/comments`, {
        method: "POST",
        headers: {
          "Accept": 'application/json',
          "Content-Type": 'application/json'
        },
        body: JSON.stringify({
          comment: {
            content: values.comment,
            event_id: this.props.eventId,
            user_id: this.props.user.id,
            like_count: 0
          }
        })
      })
      .then(response => response.json())
      .then(comment => this.props.addComment(comment))
    }
  }

  render(){
    return(
      <Fragment>
        <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Field name="comment" label="Add a comment" type="text" component={this.renderInputField} />
          {this.props.user ? <Button secondary type='submit'>Submit</Button> : <Popup trigger={<Button secondary>Submit</Button>} content="Please login to add a comment" />}
        </Form>
      </Fragment>
    )
  }
}

function validate(values) {
  const errors = {};
  if (!values.comment) {
    errors.comment = "Content cannot be blank";
  }
  return errors;
}

const mapStateToProps = state => ({
  user: state.userReducer.user
})

export default connect(mapStateToProps)(reduxForm({
  validate,
  form: "CommentForm"
})(CommentForm))
