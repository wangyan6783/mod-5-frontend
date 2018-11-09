import React, { Fragment } from 'react';
import SignupForm from '../components/SignupForm';
import { Link } from 'react-router-dom';

const SignupPage = () => {
  return (
    <Fragment>
      <h1>Sign up</h1>
      <SignupForm />
      <p>Already have an account?</p>
      <Link to="/login">Login</Link>
    </Fragment>
  )
}

export default SignupPage
