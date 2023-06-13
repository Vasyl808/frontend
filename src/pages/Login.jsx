//import '../styles/login.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState } from "react";
import error_handler from '../utils/utils'

const Login = () => {

  const [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    setIsOpen(!isOpen);
  }

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target.closest('form');
      if (form.checkValidity()) {
      const email = form.elements.email.value
      console.log(email);
      toast.success("Please, wait! We are sending a mail...",{
        position: toast.POSITION.TOP_CENTER,
        autoClose: 10000 // в мілісекундах
      })
      fetch('http://127.0.0.1:5000/api/v1/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: email}),
      })
      .then(async (response) => {
        if (!response.ok) {
            //alert(response)
            throw new Error(await response.text());
        }
            return response.text();
        })
        .then(() => {
            toast.success("Sending success! Check your mail!",{
              position: toast.POSITION.TOP_CENTER,
              autoClose: 20000 // в мілісекундах
            })
        })
        .catch((error) => {
            error_handler(error)
            console.log(`Fetch error: ${error}`);
      });
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
            <input required type="text" data-testid='username' id="username" className="login__input" />
          </div>
          <div className="login__password-block">
            <div className="login__username">Password</div>
            <input required type="password" data-testid='password' id="password" className="login__input" />
          </div>
          <button type="submit" data-testid='login_btn' className="login__btn">Login</button>
          <div className="login__signup">
            <div className="login__descr">Don't have an account?</div>
            <Link className='login__link' to='/sign-up'>Sign Up</Link>
          </div>
          <div className="login__signup">
            <div className="login__descr">Forgot your password?</div>
            <i className='login__link' data-testid='recovery_btn' onClick={handleClick}>Recover</i>
          </div>
        </form>
        {isOpen && (
        <div className="overlay">


            <div className="login">
        <form className="login__wrapper" onSubmit={handleSubmit}>
          <h2 className="login__title">Input your email</h2>
          <div className="login__username-block">
            <div className="login__username">Email</div>
            <input required type="email" data-testid='email' id="email" className="login__input" />
          </div>
          <button type="submit" data-testid='recovery' className="login__btn">Confirm</button>
          <button  data-testid='close_btn' className="login__btn" onClick={handleClick}>Reject</button>
        </form>
      </div>

        </div>
      )}
      </div>
    </>
  );
};

export default Login;
