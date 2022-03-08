import axios from 'axios';
import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import domain from '../../utils/domain';

import UserContext from '../../context/UserContext';
import ErrorMessage from '../misc/ErrorMessage';

import './AuthForm.scss';

function Login() {
  const [formEmail, setFormEmail] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);

  const { getUser } = useContext(UserContext);

  const history = useHistory();

  async function login(e) {
    e.preventDefault();

    const loginData = {
      email: formEmail,
      password: formPassword,
    };

    try {
      await axios.post(`${domain}/auth/login`, loginData);
    } catch (err) {
      if (err.response) {
        // errorMessage comes from backend validation in userRouter.js
        if (err.response.data.errorMessage) {
          setErrorMsg(err.response.data.errorMessage);
        }
      }
      return;
    }
    // need to use await because getUser is a async fn.
    // It updates context user after logging in
    await getUser();
    history.push('/');
  }

  return (
    <div className='auth-form'>
      <h2>Log in</h2>
      {errorMsg && (
        <ErrorMessage msg={errorMsg} clear={() => setErrorMsg(null)} />
      )}
      <form className='form' onSubmit={login}>
        <label htmlFor='form-email'>Email</label>
        <input
          id='form-email'
          type='email'
          value={formEmail}
          onChange={(e) => setFormEmail(e.target.value)}
        />

        <label htmlFor='form-password'>Password</label>
        <input
          id='form-password'
          type='password'
          value={formPassword}
          onChange={(e) => setFormPassword(e.target.value)}
        />

        <button className='btn-submit' type='submit'>
          Log in
        </button>
      </form>

      <p>
        Don't have account yet? <Link to='/register'>Register here</Link>
      </p>
    </div>
  );
}

export default Login;
