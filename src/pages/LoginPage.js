import React, { Fragment } from 'react';
import LoginForm from '../components/LoginForm';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <Fragment>
      <h1>Log in</h1>
      <LoginForm />
      <p>Don't have an account?</p>
      <Link exact to="/signup">Signup</Link>
    </Fragment>
  )
}

export default LoginPage
