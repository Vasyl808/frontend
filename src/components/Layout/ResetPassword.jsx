import React, { useState } from 'react';
import error_handler from '../../utils/utils';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [message, setMessage] = useState('');
  const token = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(token.token);
    if (passwordConfirm !== password) {
      toast.error("Пароль не підтверджений", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 20000 // в мілісекундах
      });
      return;
    }
    const response = await fetch('http://127.0.0.1:5000/api/v1/reset-password/' + token.token, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({token: token.token, password: password, password_confirm: passwordConfirm }),
    });
    if (!response.ok) {
      const error = await response.text();
      error_handler(error);
      throw new Error(error);
    }
    else{
      const data = await response.json();
      setMessage(data.message);
      window.location.href = '/login'
    }
    
  };

  return (
    <>
    <section className="common__section">
        <div className="text-center">
          <h1>Reset Password</h1>
        </div>
      </section>
      <div className="login">
        <form className="login__wrapper" onSubmit={handleSubmit}>
          <h2 className="login__title"> Reset Password</h2>
          <div className="login__username-block">
            <div className="login__username">Password</div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login__input"
            />
          </div>
          <div className="login__password-block">
            <div className="login__username">Password confirm</div>
            <input
              type="password"
              id="passwordConfirm"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              className="login__input"
            />
          </div>
          <button type="submit" data-testid='login_btn' className="login__btn">Reset Password</button>
          {message && <p>{message}</p>}
        </form>
        </div>
    </>
  );
}

export default ResetPassword;

