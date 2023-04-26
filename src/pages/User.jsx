import '../styles/user.scss';
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

    async function delete_user(event){
        event.preventDefault();
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
                if (error instanceof Error) {
                    // This is a network error, display a generic message
                    try {
                      const errorJson = JSON.parse(error.message);
                      const errorFields = Object.keys(errorJson);
                      let errorMessage = '';
                
                      errorFields.forEach((field) => {
                        errorMessage += `${field}: ${errorJson[field][0]}\n`;
                      });
                        toast.error(`Error:\n${errorMessage}`, {
                          position: toast.POSITION.TOP_CENTER,
                          autoClose: 20000 // в мілісекундах
                      });
                    } catch (e) {
                      toast.error(error.message, {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 20000 // в мілісекундах
                    });
                    }
                  } else {
                      toast.error(error.message, {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 20000 // в мілісекундах
                    });
                  }
                console.log(`Fetch error: ${error}`);
            });
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
                    <button class="panel__btn">
                        <Link to={`/update-user/${id_user}`}>Update User</Link>
                    </button>
                    <button class="panel__btn" type="submit" id="delete_btn" onClick={delete_user}>
                        Delete account
                    </button>
                    <button class="panel__btn">
                        <Link to={`/user-shopping-list/${id_user}`}>Shopping list</Link>
                    </button>
                    <button class="panel__btn" type="submit" id="logout_btn" onClick={logout}>
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
        </div>
    </>)
}

export default User;