import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createEvent } from '../store/actions/index';
import { withRouter } from "react-router";

class SignupForm extends Component {

  renderInputField = (field) => {
    return (
      <Form.Field>
        <label>{field.label}</label>
        <input type={field.type} {...field.input} />
        {field.meta.touched ? field.meta.error : ""}
      </Form.Field>
    )
  }

  onSubmit = (values) => {
    createEvent(values, this.props.resortId, (url) => {
      this.props.history.push(url)
    });
  }

  render(){
    const { handleSubmit } = this.props;

    return(
      <Form onSubmit={handleSubmit(this.onSubmit)}>
        <Field name="username" label="Username" type="text" component={this.renderInputField} />
        <Field name="email" label="Email" type="text" component={this.renderInputField} />
        <Field name="password" label="Password" type="password" component={this.renderInputField} />
        <Button type='submit'>Submit</Button>
      </Form>
    )
  }
}

function validate(values) {
  const errors = {};

  if (!values.username) {
    errors.username = "Please enter a username";
  }
  if (!values.email) {
    errors.email = "Please enter a email";
  }
  if (!values.password) {
    errors.password = "Please enter a password";
  }
  return errors;
}

export default reduxForm({
  validate,
  form: "SignupForm"
})(connect()(withRouter(SignupForm)));