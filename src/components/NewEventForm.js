import React, { Component } from 'react';
import { Button, Form, Label } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createEvent } from '../store/actions/index';
import { withRouter } from "react-router";

class NewEventForm extends Component {

  renderInputField = (field) => {
    return (
      <Form.Field>
        <label className="form-label">{field.label}</label>
        <input type="text" {...field.input} />
        {field.meta.touched && field.meta.error ? <Label basic color='teal' pointing> {field.meta.error}</Label> : ""}
      </Form.Field>
    )
  }

  renderDescriptionField = (field) => {
    return (
      <Form.Field>
        <label>Description</label>
        <textarea type="text" {...field.input} />
        {field.meta.touched ? field.meta.error : ""}
      </Form.Field>
    )
  }

  onSubmit = (values) => {
    createEvent(values, this.props.resortId, this.props.hostId, (url) => {
      this.props.history.push(url)
    });
  }

  render(){
    return(
      <Form className="new-event-form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field name="title" label="Title" component={this.renderInputField} />
        <Field name="date" label="Date" component={this.renderInputField} />
        <Field name="description" component={this.renderDescriptionField} />
        <Button type='submit' color="teal">Submit</Button>
      </Form>
    )
  }
}

function validate(values) {
  const errors = {};

  // values = {title: "asdf", description: "inputvalue", content: ""}

  if (!values.title) {
    errors.title = "Title cannot be blank";
  }
  if (!values.date) {
    errors.date = "Date cannot be blank";
  }
  return errors;
}

export default reduxForm({
  validate,
  form: "NewEventForm"
})(connect()(withRouter(NewEventForm)));
