import '../styles/login.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import error_handler from '../utils/utils'

const Login = () => {

  async function loginUser(body) {
    const headers = new Headers();
    headers.set('Authorization', `Basic ${btoa(`${body.username}:${body.password}`)}`);
    headers.set('content-type', 'application/json');
    const response = await fetch('http://127.0.0.1:5000/api/v1/user/login', {
      method: 'POST',
      body: JSON.stringify(body),
      headers,
    });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }
    return response.json();
  }

  const buttonHandler = async (event) => {
    event.preventDefault();
    const form = event.target.closest('form');
    if (form.checkValidity()) {
      const username = form.elements.username;
      const password = form.elements.password;
      const entry = {
        username: username.value,
        password: password.value,
      };

      try {
        const data = await loginUser(entry);
        const id_user = data.id_user;
        const userstatus = data.userstatus;
        const token = btoa(`${data.username}:${password.value}`);

        localStorage.setItem('id_user', id_user);
        localStorage.setItem('userstatus', userstatus);
        localStorage.setItem('token', token);

        window.location.href = '/user/' + Number(window.localStorage.getItem('id_user'));
      } catch (error) {
        error_handler(error);
        console.error(error);
        toast.error('Provided username or password does not exist!', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 20000 // в мілісекундах
        });
      }
    }
  };

  return (
    <>
      <section className="common__section">
        <div className="text-center">
          <h1>Login</h1>
        </div>
      </section>

      <div className="login">
        <form className="login__wrapper" onSubmit={buttonHandler}>
          <h2 className="login__title">Login</h2>
          <div className="login__username-block">
            <div className="login__username">Username</div>
            <input required type="text" id="username" className="login__input" />
          </div>
          <div className="login__password-block">
            <div className="login__username">Password</div>
            <input required type="password" id="password" className="login__input" />
          </div>
          <button type="submit" className="login__btn">Login</button>
          <div className="login__signup">
            <div className="login__descr">Don't have an account?</div>
            <Link className='login__link' to='/sign-up'>Sign Up</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
