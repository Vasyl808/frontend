  function setUserData(data){
    const username = document.getElementById('username');
    username.value  = data['user']['username'];
    const first_name = document.getElementById('first_name');
    first_name.value  = data['user']['first_name'];
    const last_name = document.getElementById('last_name');
    last_name.value  = data['user']['last_name'];
    const email = document.getElementById('email');
    email.value  = data['user']['email'];
    const phone_number = document.getElementById('phone_number');
    phone_number.value  = data['user']['phone_number'];
    //const password = document.getElementById('password');
    //password.value  = data['user']['password'];
    const age = document.getElementById('age');
    age.value  = data['user']['age'];
    console.log(window.localStorage.getItem('token'))
}

const token = window.localStorage.getItem('token')
    const id_user = window.localStorage.getItem('id_user')
    const headers = new Headers();
    headers.set('Authorization', 'Basic ' + token);
    headers.set('content-type', 'application/json');

fetch('http://127.0.0.1:5000/api/v1/user/' + id_user, {
    method: 'GET',
    headers: headers
}).then((response) => {
    if (response.status === 200) {
        return response.json();
    }
    window.location.href = 'login.html';
}).then(data => {
    console.log(data);
    setUserData(data);
})

let editButton = document.getElementById('update');

editButton.onclick = e => {
    e.preventDefault();
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const first_name = document.getElementById('first_name');
    const last_name = document.getElementById('last_name');
    const email = document.getElementById('email');
    const phone_number = document.getElementById('phone_number');
    const age = document.getElementById('age');
    
    
    if (String(password.value).length === 0){
        const entry = {
            first_name: first_name.value,
            last_name: last_name.value,
            username: username.value,
            email: email.value,
            age: age.value,
            phone_number: phone_number.value
          };
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
                window.location.href = 'login.html';
            }
            else {
                response.text().then((data) => {
                    throw data;
                }).catch(e => {
                    if (e) {
                        error.innerHTML = e;
                        console.log(e);
                    }
                });
            }
        }).catch(e => {
            alert(e)
            console.log(e)
        })
    }
    else{
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const first_name = document.getElementById('first_name');
    const last_name = document.getElementById('last_name');
    const email = document.getElementById('email');
    const phone_number = document.getElementById('phone_number');
    const age = document.getElementById('age');
        const entry = {
            first_name: first_name.value,
            last_name: last_name.value,
            username: username.value,
            password: password.value,
            email: email.value,
            age: age.value,
            phone_number: phone_number.value
          };
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
                window.location.href = 'login.html';
            }
            else {
                response.text().then((data) => {
                    throw data;
                }).catch(e => {
                    if (e) {
                        error.innerHTML = e;
                        console.log(e);
                    }
                });
            }
        }).catch(e => {
            alert(e);
            console.log(e)
        })
    }
        // console.log(request_body)

        
    }