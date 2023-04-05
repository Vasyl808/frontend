const button = document.querySelector('.login__btn');
const form = document.querySelector('.login__wrapper');

function loginUser(body) {
  const headers = new Headers();
  headers.set('Authorization', `Basic ${btoa(`${body.username}:${body.password}`)}`);
  headers.set('content-type', 'application/json');
  return fetch('http://127.0.0.1:5000/api/v1/user/login', {
    method: 'POST',
    body: JSON.stringify(body),
    headers,
  });
}

async function buttonHandler(event) {
  if (form.checkValidity()) {
    event.preventDefault();

    const username = document.getElementById('username');
    const password = document.getElementById('password');
    //window.localStorage.setItem('password', password.value)
    const entry = {
      username: username.value,
      password: password.value,
    };

    loginUser(entry)
      .then(async (response) => {
        if (!response.ok) {
          alert(response)
          throw new Error(await response.text());
        }
        return response.json();
      })
      .then(data => {
        const id_user = data.id_user;
        const username = data.username
        window.localStorage.setItem('id_user', id_user)
        //window.localStorage.setItem('username', username)
        window.localStorage.setItem('token', btoa(username + ':' + password.value))
        //window.localStorage.setItem('password', password.value)
        const userstatus = data.userstatus
        window.localStorage.setItem('userstatus', userstatus)
        window.location.href = 'User.html';
      })
      .catch(error => {
        console.error(error);
        alert('Provided username or password does not exist!');
      });
  }
}

button.addEventListener('click', buttonHandler);