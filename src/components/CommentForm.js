import React, { Fragment } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button, Form } from 'semantic-ui-react';

const CommentForm = (props) => {

  const renderInputField = (field) => {
    return (
      <Form.Field>
        <input className="event-search" type="text"  placeholder="Add a comment" {...field.input} />
        {field.meta.touched ? field.meta.error : ""}
      </Form.Field>
    )
  }

  const onSubmit = (values) => {
    console.log(values);
  }

  return(
    <Fragment>
        <Form onSubmit={props.handleSubmit(onSubmit)}>
          <Field name="comment" label="Comment" component={renderInputField} />
        </Form>
     </Fragment>
  )

}

function validate(values) {
  const errors = {};
  if (!values.comment) {
    errors.comment = "Please add a comment";
  }
  return errors;
}

export default reduxForm({
  validate,
  form: "CommentForm"
})(CommentForm)
