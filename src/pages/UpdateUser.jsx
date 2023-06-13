//import '../styles/update-user.scss';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import error_handler from '../utils/utils'
import { set } from 'date-fns';
import Spinner from '../components/Spinner/Spinner';

function UpdateUser() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const {id} = useParams();
  const id_user = id;

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    //const id_user = window.localStorage.getItem('id_user');
    const headers = new Headers();
    headers.set('Authorization', 'Basic ' + token);
    headers.set('content-type', 'application/json');

    fetch(`http://127.0.0.1:5000/api/v1/user/${id_user}`, {
      method: 'GET',
      headers: headers,
    })
      .then(async response => {
          if (!response.ok) {
              //alert('Provided username or password does not exist!');
              throw new Error(await response.text())
          }
          return response.json()
      })
      .then((data) => {
        console.log(data.user);
        setUserData(data.user);
        setFirstName(data.user.first_name);
        setLastName(data.user.last_name);
        setUsername(data.user.username);
        setEmail(data.user.email);
        setAge(data.user.age);
        setPhoneNumber(data.user.phone_number);
        console.log(firstName);
      })
      .catch(error => {
        //alert(error)
        error_handler(error)
        console.error(error)
    });
    setIsLoading(false);
  }, []);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const token = window.localStorage.getItem('token');
    //const id_user = window.localStorage.getItem('id_user');
    const headers = new Headers();
    headers.set('Authorization', 'Basic ' + token);
    headers.set('content-type', 'application/json');
    if (String(password).length === 0){
        const entry = {
            first_name: firstName,
            last_name: lastName,
            username: username,
            email: email,
            age: age,
            phone_number: phoneNumber,
          }
        console.log(entry)
        fetch('http://127.0.0.1:5000/api/v1/user/' + id_user, {
            method: 'PUT',
            body: JSON.stringify(entry),
            headers: headers
        })
        .then( async (response) => {
          if (!response.ok) {
            throw new Error( await response.text());
          }
          return response.text();
        })
        .then(() => {
                //current_user.username = request_body['username'];
                //current_user.password = request_body['password'];
                //window.localStorage.setItem('loggedIn_user', JSON.stringify(current_user));
                //window.localStorage.clear();
                window.location.href = '/user/'+id_user;
            
        })
        .catch((error) => {
          error_handler(error);
          console.log(`Fetch error: ${error}`);
        });
    }
    else{
        const entry = {
          first_name: firstName,
          last_name: lastName,
          username: username,
          email: email,
          age: age,
          phone_number: phoneNumber,
          password: password
          }
          fetch('http://127.0.0.1:5000/api/v1/user/' + id_user, {
            method: 'PUT',
            body: JSON.stringify(entry),
            headers: headers
        }).then( async (response) => {
          if (!response.ok) {
            throw new Error( await response.text());
          }
          return response.text();
        })
        .then(() => {
                //current_user.username = request_body['username'];
                //current_user.password = request_body['password'];
                //window.localStorage.setItem('loggedIn_user', JSON.stringify(current_user));
                window.localStorage.clear();
                window.location.href = '/login';
            
        })
        .catch((error) => {
          error_handler(error);
          console.log(`Fetch error: ${error}`);
        });
    }
  };

  if (isLoading) {
    return <Spinner/>; // Показуємо завантажувальний екран
  }

  return (
    <>
      <section className="common__section">
        <div className="text-center">
          <h1>{userData.username}</h1>
        </div>
      </section>

      <div className="update-user">
        <form onSubmit={handleFormSubmit} className="update-user__wrapper">
          <h2 className="update-user__title">Update User</h2>
          <div className="update-user__username-block">
            <div className="update-user__username">First Name</div>
            <input required type="text" data-testid='first_name' onChange={(event) => setFirstName(event.target.value)} className="update-user__input" id="first_name" defaultValue={userData.first_name} name="first_name" />
          </div>
          <div className="update-user__username-block">
            <div className="update-user__username">Last Name</div>
            <input required type="text" data-testid='last_name' onChange={(event) => setLastName(event.target.value)} className="update-user__input" id="last_name" defaultValue={userData.last_name} name="last_name" />
          </div>
          <div className="update-user__username-block">
            <div className="update-user__username">Username</div>
            <input required type="text" data-testid='username' onChange={(event) => setUsername(event.target.value)} className="update-user__input" id="username" defaultValue={userData.username} name="username" />
          </div>
          <div className="update-user__username-block">
            <div class="update-user__username">Email</div>
            <input required type="text" data-testid='email' onChange={(event) => setEmail(event.target.value)} class="update-user__input" defaultValue={userData.email} id="email" />
          </div>
            <div class="update-user__username-block">
                <div class="update-user__username">Phone number</div>
                <input required type="text" data-testid='phone_number' onChange={(event) => setPhoneNumber(event.target.value)} class="update-user__input" defaultValue={userData.phone_number} id="phone_number" />
            </div>
            <div class="update-user__username-block">
                <div class="update-user__username">Age</div>
                <input required type="number" data-testid='age' onChange={(event) => setAge(event.target.value)} id="age" defaultValue={userData.age} class="update-user__input" />
            </div>
            <div class="update-user__password-block">
                <div class="update-user__username">Password</div>
                <input type="password" data-testid='password' onChange={(event) => setPassword(event.target.value)} class="update-user__input" id="password" />
            </div>
            <button type="submit"  data-testid='update' class="update-user__btn" id="update">
                Update
            </button>
        </form>
    </div>
    </>
    )
}
export default UpdateUser;