import React, { Component, Fragment } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form, Button, TextArea } from 'semantic-ui-react'


class CommentForm extends Component {

  renderInputField = (field) => {
    return (
      <Form.Field>
        <label>{field.label}</label>
        <TextArea type={field.type} style={{width: '45%'}} {...field.input} />
        <br/>
        {field.meta.touched ? field.meta.error : ""}
      </Form.Field>
    )
  }

  onSubmit = (values) => {
    fetch("http://localhost:3001/api/v1/comments", {
      method: "POST",
      headers: {
        "Accept": 'application/json',
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        comment: {
          content: values.comment,
          event_id: this.props.eventId,
          user_id: 175,
          like_count: 0
        }
      })
    })
    .then(response => response.json())
    .then(comment => this.props.addComment(comment))
  }
  render(){
    return(
      <Fragment>
        <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Field name="comment" label="Add a comment" type="text" component={this.renderInputField} />
          <Button type='submit'>Submit</Button>
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

export default reduxForm({
  validate,
  form: "CommentForm"
})(CommentForm)
