import React, { Fragment } from 'react';
import SignupForm from '../components/SignupForm';
import { Link } from 'react-router-dom';

const SignupPage = () => {
  return (
    <Fragment>
      <h1>Join our community!</h1>
      <SignupForm />
      <p>Already have an account?</p>
      <Link exact to="/login">Login</Link>
    </Fragment>
  )
}

export default SignupPage
