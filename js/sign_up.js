const button = document.querySelector('.login__btn');
const form = document.querySelector('.login__wrapper');

function signupUser(body) {
  return fetch('http://127.0.0.1:5000/api/v1/user', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: new Headers({
      'content-type': 'application/json',
    }),
  });
}

async function buttonHandler(event) {
  if (form.checkValidity()) {
    event.preventDefault();

    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const first_name = document.getElementById('first_name');
    const last_name = document.getElementById('last_name');
    const email = document.getElementById('email');
    const phone_number = document.getElementById('phone_number');
    const age = document.getElementById('age');
    const confirm_password = document.getElementById('confirm_password');

    const entry = {
      first_name: first_name.value,
      last_name: last_name.value,
      username: username.value,
      password: password.value,
      email: email.value,
      age: age.value,
      phone_number: phone_number.value
    };
    if(confirm_password.value != password.value){
      alert('Пароль не підтверджений')
      window.location.href = 'Signup.html';
    }
    signupUser(entry)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(await response.text());
        }
        return response.text();
      })
      .then(() => {
        //window.localStorage.setItem('current_user', JSON.stringify(entry));
        window.location.href = 'login.html';
      })
      .catch((error) => {
        alert(error)
        console.log(`Fetch error: ${error}`);
      });
  }
}

button.addEventListener('click', buttonHandler);