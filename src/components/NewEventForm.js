import React, { Fragment, Component } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';

class NewEventForm extends Component {

  // state = {
  //   title: "",
  //   description: "",
  //   date: ""
  // }
  //
  // handleInput = (event) => {
  //   this.setState({
  //     [event.target.name]: event.target.value
  //   })
  // }
  //
  // newEvent = () => {
  //   fetch("http://localhost:3001/api/v1/events", {
  //     method: "POST",
  //     headers: {
  //       "Accept": 'application/json',
  //       "Content-Type": 'application/json'
  //     },
  //     body: JSON.stringify({
  //       event: {
  //         title: this.state.title,
  //         description: this.state.description,
  //         date: this.state.date,
  //         resort_id: this.props.resortId
  //       }
  //     })
  //   })
  //   .then(response => response.json())
  //   .then(event => console.log(event))
  // }
  //
  // render(){
  //   return (
  //     <Form onSubmit={this.newEvent}>
  //       <Form.Field>
  //         <label>Title</label>
  //         <input placeholder='Title' name="title" value={this.state.title} onChange={this.handleInput} />
  //       </Form.Field>
  //       <Form.Field>
  //         <label>Description</label>
  //         <textarea placeholder='Description' name="description" value = {this.state.description} onChange={this.handleInput}/>
  //       </Form.Field>
  //       <Form.Field>
  //         <label>Date</label>
  //         <input placeholder='Date' name="date" value={this.state.date} onChange={this.handleInput}/>
  //       </Form.Field>
  //       <Button type='submit'>Submit</Button>
  //     </Form>
  //   )
  // }
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
    console.log(values);
  }

  render(){
    const { handleSubmit } = this.props;

    return(
      <Form onSubmit={handleSubmit(this.onSubmit)}>
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
    errors.title = "Please enter a title";
  }
  if (!values.date) {
    errors.date = "Please enter a date";
  }
  if (!values.description) {
    errors.description = "Please enter a description";
  }
  return errors;
}

export default reduxForm({
  validate,
  form: "NewEventForm"
})(NewEventForm);
