import '../styles/Signup.scss';
import { useState } from "react";
import error_handler from '../utils/utils'
import { toast } from 'react-toastify';

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function signupUser(body) {
    return fetch("http://127.0.0.1:5000/api/v1/user", {
      method: "POST",
      body: JSON.stringify(body),
      headers: new Headers({
        "content-type": "application/json",
      }),
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (confirmPassword !== password) {
      toast.error("Пароль не підтверджений", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 20000 // в мілісекундах
      });
      return;
    }

    const entry = {
      first_name: firstName,
      last_name: lastName,
      username: username,
      password: password,
      email: email,
      age: age,
      phone_number: phoneNumber,
    };
    signupUser(entry)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(await response.text());
        }
        return response.text();
      })
      .then(() => {
        //window.localStorage.setItem('current_user', JSON.stringify(entry));
        window.location.href = '/login';
      })
      .catch((error) => {
        error_handler(error);
        console.log(`Fetch error: ${error}`);
      });
  }

  return (
    <>
      <section className="common__section">
        <div className="text-center">
          <h1>Sign Up</h1>
        </div>
      </section>

      <div className="signup">
        <form onSubmit={handleSubmit} className="signup__wrapper">
          <h2 className="signup__title">Sign Up</h2>
          <div className="signup__username-block">
            <div className="signup__username">First name</div>
            <input
              required
              type="text"
              id="first_name"
              className="signup__input"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
          </div>
          <div className="signup__username-block">
            <div className="signup__username">Last name</div>
            <input
              required
              type="text"
              id="last_name"
              className="signup__input"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
          </div>
          <div className="signup__username-block">
            <div className="signup__username">Username</div>
            <input
              required
              type="text"
              id="username"
              className="signup__input"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="signup__username-block">
            <div className="signup__username">Email</div>
            <input
              required
              type="email"
              id="email"
              className="signup__input"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="signup__username-block">
            <div className="signup__username">Age</div>
            <input
              required
              type="number"
              id="age"
              className="signup__input"
              value={age}
              onChange={(event) => setAge(event.target.value)}
            />
          </div>
          <div className="signup__username-block">
            <div className="signup__username">Phone number</div>
            <input
              required
              type="tel"
       pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              id="phone_number"
              className="signup__input"
              placeholder="123-4567-8901"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
            />
          </div>
          <div className="signup__username-block">
            <div className="signup__username">Password</div>
            <input
              required
              type="password"
              id="password"
              className="signup__input"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="signup__username-block">
            <div className="signup__username">Confirm password</div>
            <input
              required
              type="password"
              id="confirm_password"
              className="signup__input"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </div>
          <button class="signup__btn" type="submit" onClick={handleSubmit}>Sign Up</button>
        </form>
    </div>
    </>
    );
}


export default Signup;