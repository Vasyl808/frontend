//import '../styles/user.scss';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import error_handler from '../utils/utils'

const Admin_Panel = () => (
    <button class="panel__btn">
        <Link to="/admin">Admin panel</Link>
    </button>
  );

const None = () =>(
    <></>
);

const User = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen1, setIsOpen1] = useState(false);

    function handleClick() {
        setIsOpen(!isOpen);
      }

    function handleClick1() {
        setIsOpen1(!isOpen1);
      }
    //useEffect(() => {
    //    setIsAdmin(localStorage.getItem('userstatus') === "pharmacist");
    //}, []);
    const {id} = useParams();
    const id_user = id;
    function getUser() {
        const token = window.localStorage.getItem('token')
        //const id_user = window.localStorage.getItem('id_user')
        const headers = new Headers();
        headers.set('Authorization', 'Basic ' + token);
        headers.set('content-type', 'application/json');
        fetch('http://127.0.0.1:5000/api/v1/user/' + id_user, {
          method: 'GET', 
          headers,
        })
        .then(async response => {
            if (!response.ok) {
                //alert('Provided username or password does not exist!');
                throw new Error(await response.text())
            }
            return response.json()
        })
        .then(data => {
            setUserData(data);
        })
        .catch(error => {
            //alert(error)
            error_handler(error)
            console.error(error)
        })
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
            if (String(btoa(`${data.username}:${password.value}`)) === String(window.localStorage.getItem('token'))){
                window.location.href = '/update-user/' + Number(data.id_user);
            }
            else{
                toast.error('Provided username or password does not exist!', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 20000 // в мілісекундах
                  });
            }
    
            
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
    
      const buttonHandler1 = async (event) => {
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
            if (String(btoa(`${data.username}:${password.value}`)) === String(window.localStorage.getItem('token'))){
                deleteUser()
                        .then(async (response) => {
                        if (!response.ok) {
                            //alert(response)
                            throw new Error(await response.text());
                        }
                            return response.text();
                        })
                        .then(() => {
                            window.localStorage.clear();
                            window.location.href = '/login';
                        })
                        .catch((error) => {
                            //alert(error)
                            error_handler(error);
                            console.log(`Fetch error: ${error}`);
                        });
            }
            else{
                toast.error('Provided username or password does not exist!', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 20000 // в мілісекундах
                  });
            }
    
            
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
    
    function setUserData(data){
        const username1 = document.getElementById('title-user');
        username1.innerText = data['user']['username'];
        const username = document.getElementById('username');
        username.innerText = data['user']['username'];
        const first_name = document.getElementById('first_name');
        first_name.innerText = data['user']['first_name'];
        const last_name = document.getElementById('last_name');
        last_name.innerText = data['user']['last_name'];
        const email = document.getElementById('email');
        email.innerText = data['user']['email'];
        const phone_number = document.getElementById('phone_number');
        phone_number.innerText = data['user']['phone_number'];
        //window.localStorage.setItem('userstatus', data['user']['userstatus'])
        //console.log(window.localStorage.getItem('userstatus'))
    }

    useEffect(() => {
        //const headerOptionsElement = document.querySelector('.panel__info-wrapper');
        console.log(localStorage.getItem("userstatus") === 'user')
        setIsAdmin(localStorage.getItem('userstatus') === "pharmacist");
        getUser();
      }, []);

    async function logout() {
        console.log(localStorage)
        window.localStorage.clear();
        window.location.href = '/home';
    }

    function deleteUser(){
        const token = window.localStorage.getItem('token')
        //const id_user = window.localStorage.getItem('id_user')
        const headers = new Headers();
        headers.set('Authorization', 'Basic ' + token);
        headers.set('content-type', 'application/json');
        return fetch('http://127.0.0.1:5000/api/v1/user/' + id_user, {
            method: 'DELETE',
            headers,
        });
    }

    return(<>
          <section class="common__section">
            <div class='text-center'>
                <h1 id='title-user'></h1>
            </div>
        </section>

        <div class="panel">
            <div class="panel__wrapper">
                <div class="panel__main">
                    <h2 class="panel__title">
                        User Panel
                    </h2>
                    <button class="panel__btn" data-testid='open_btn' onClick={handleClick}>
                        Update User
                    </button>
                    <button class="panel__btn" data-testid="delete" type="submit" id="delete_btn" onClick={handleClick1}>
                        Delete account
                    </button>
                    <button class="panel__btn">
                        <Link to={`/user-shopping-list/${id_user}`}>Shopping list</Link>
                    </button>
                    <button class="panel__btn" data-testid="logout" type="submit" id="logout_btn" onClick={logout}>
                        Log Out
                    </button>
                </div>
                <div class="panel__info">
                    <h2 class="panel__info-title">
                        User Info
                    </h2>
                    <div class="panel__info-wrapper">
                        <div class="panel__info-block">
                            <div class="panel__info__name">Username:</div>
                            <div class="panel__info__name" id="username"></div>
                        </div>
                        <div class="panel__info-block">
                            <div class="panel__info__name">First name:</div>
                            <div class="panel__info__name" id="first_name"></div>
                        </div>
                        <div class="panel__info-block">
                            <div class="panel__info__name">Last name:</div>
                            <div class="panel__info__name" id="last_name"></div>
                        </div>
                        <div class="panel__info-block">
                            <div class="panel__info__name">Email:</div>
                            <div class="panel__info__name" id="email"></div>
                        </div>
                        <div class="panel__info-block">
                            <div class="panel__info__name">Phone number:</div>
                            <div class="panel__info__name" id="phone_number"></div>
                        </div>
                        {isAdmin ? <Admin_Panel /> : <None />}
                    </div>
                </div>
            </div>
            {isOpen && (
        <div className="overlay">


            <div className="login">
        <form className="login__wrapper" onSubmit={buttonHandler}>
          <h2 className="login__title">Confirm your data</h2>
          <div className="login__username-block">
            <div className="login__username">Username</div>
            <input required type="text" data-testid='username' id="username" className="login__input" />
          </div>
          <div className="login__password-block">
            <div className="login__username">Password</div>
            <input required type="password" data-testid='password' id="password" className="login__input" />
          </div>
          <button type="submit" data-testid='login_btn' className="login__btn">Confirm</button>
          <button  data-testid='close_btn' className="login__btn" onClick={handleClick}>Reject</button>
        </form>
      </div>

        </div>
      )}
      {isOpen1 && (
        <div className="overlay">


            <div className="login">
        <form className="login__wrapper" onSubmit={buttonHandler1}>
          <h2 className="login__title">Confirm your data</h2>
          <div className="login__username-block">
            <div className="login__username">Username</div>
            <input required type="text" data-testid='username' id="username" className="login__input" />
          </div>
          <div className="login__password-block">
            <div className="login__username">Password</div>
            <input required type="password" data-testid='password' id="password" className="login__input" />
          </div>
          <button type="submit" data-testid='login_btn' className="login__btn">Confirm</button>
          <button  data-testid='close_btn' className="login__btn" onClick={handleClick1}>Reject</button>
        </form>
      </div>

        </div>
      )}
        </div>
    </>)
}

export default User;