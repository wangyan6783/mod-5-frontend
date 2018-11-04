import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createEvent } from '../store/actions/index';
import { withRouter } from "react-router";

class NewEventForm extends Component {

  renderInputField = (field) => {
    return (
      <Form.Field>
        <label>{field.label}</label>
        <input type="text"  placeholder={field.label} {...field.input} />
        {field.meta.touched ? field.meta.error : ""}
      </Form.Field>
    )
  }

  renderDescriptionField = (field) => {
    return (
      <Form.Field>
        <label>Description</label>
        <textarea type="text"  placeholder="Description" {...field.input} />
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
    return(
      <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field name="title" label="Title" component={this.renderInputField} />
        <Field name="date" label="Date" component={this.renderInputField} />
        <Field name="description" component={this.renderDescriptionField} />
        <Button type='submit'>Submit</Button>
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
