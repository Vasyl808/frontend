import '../styles/update-user.scss';

import React, { useState, useEffect } from 'react';

function UpdateUser() {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    const id_user = window.localStorage.getItem('id_user');
    const headers = new Headers();
    headers.set('Authorization', 'Basic ' + token);
    headers.set('content-type', 'application/json');

    fetch(`http://127.0.0.1:5000/api/v1/user/${id_user}`, {
      method: 'GET',
      headers: headers,
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        window.location.href = '/login';
      })
      .then((data) => {
        setUserData(data.user);
      });
  }, []);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const token = window.localStorage.getItem('token');
    const id_user = window.localStorage.getItem('id_user');
    const headers = new Headers();
    headers.set('Authorization', 'Basic ' + token);
    headers.set('content-type', 'application/json');
    if (String(form.password.value).length === 0){
        const entry = {
            first_name: form.first_name.value,
            last_name: form.last_name.value,
            username: form.username.value,
            email: form.email.value,
            age: form.age.value,
            phone_number: form.phone_number.value,
          }
        fetch('http://127.0.0.1:5000/api/v1/user/' + id_user, {
            method: 'PUT',
            body: JSON.stringify(entry),
            headers: headers
        }).then(response => {
            if (response.status === 200) {
                //current_user.username = request_body['username'];
                //current_user.password = request_body['password'];
                //window.localStorage.setItem('loggedIn_user', JSON.stringify(current_user));
                //window.localStorage.clear();
                window.location.href = '/user';
            }
            else {
                response.text().then((data) => {
                    throw data;
                }).catch(e => {
                    if (e) {
                        alert(e);
                    }
                });
            }
        }).catch(e => {
            alert(e)
            console.log(e)
        })
    }
    else{
        const entry = {
            first_name: form.first_name.value,
            last_name: form.last_name.value,
            username: form.username.value,
            password: form.password.value,
            email: form.email.value,
            age: form.age.value,
            phone_number: form.phone_number.value,
          }
          fetch('http://127.0.0.1:5000/api/v1/user/' + id_user, {
            method: 'PUT',
            body: JSON.stringify(entry),
            headers: headers
        }).then(response => {
            if (response.status === 200) {
                //current_user.username = request_body['username'];
                //current_user.password = request_body['password'];
                //window.localStorage.setItem('loggedIn_user', JSON.stringify(current_user));
                window.localStorage.clear();
                window.location.href = '/login';
            }
            else {
                response.text().then((data) => {
                    throw data;
                }).catch(e => {
                    if (e) {
                        alert(e);
                        console.log(e);
                    }
                });
            }
        }).catch(e => {
            alert(e);
            console.log(e)
        })
    }
  };

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
            <input required type="text" className="update-user__input" id="first_name" defaultValue={userData.first_name} name="first_name" />
          </div>
          <div className="update-user__username-block">
            <div className="update-user__username">Last Name</div>
            <input required type="text" className="update-user__input" id="last_name" defaultValue={userData.last_name} name="last_name" />
          </div>
          <div className="update-user__username-block">
            <div className="update-user__username">Username</div>
            <input required type="text" className="update-user__input" id="username" defaultValue={userData.username} name="username" />
          </div>
          <div className="update-user__username-block">
            <div class="update-user__username">Email</div>
            <input required type="text" class="update-user__input" defaultValue={userData.email} id="email" />
          </div>
            <div class="update-user__username-block">
                <div class="update-user__username">Phone number</div>
                <input required type="text" class="update-user__input" defaultValue={userData.phone_number} id="phone_number" />
            </div>
            <div class="update-user__username-block">
                <div class="update-user__username">Age</div>
                <input required type="number" id="age" defaultValue={userData.age} class="update-user__input" />
            </div>
            <div class="update-user__password-block">
                <div class="update-user__username">Password</div>
                <input type="password" class="update-user__input" id="password" />
            </div>
            <button type="submit" class="update-user__btn" id="update">
                Update
            </button>
        </form>
    </div>
    </>
    )
}
export default UpdateUser;