window.addEventListener("load", function(event) {
    const headerOptionsElement = document.querySelector('.panel__info-wrapper');
    console.log(localStorage.getItem("userstatus") === 'user')
    if(localStorage.getItem('userstatus') === "pharmacist"){
        headerOptionsElement.insertAdjacentHTML("beforeend",
        '<button class="panel__btn">'+
        '<a href="Admin.html">Admin panel</a>'+
    '</button>');;
    }
    getUser();
});

function getUser() {
    const token = window.localStorage.getItem('token')
    const id_user = window.localStorage.getItem('id_user')
    const headers = new Headers();
    headers.set('Authorization', 'Basic ' + token);
    headers.set('content-type', 'application/json');
    fetch('http://127.0.0.1:5000/api/v1/user/' + id_user, {
      method: 'GET', 
      headers,
    })
    .then(response => {
        if (!response.ok) {
            alert('Provided username or password does not exist!');
            throw new Error('Could not authenticate')
        }
        return response.json()
    })
    .then(data => {
        setUserData(data);
    })
    .catch(error => {
        alert(error)
        console.error(error)
    })
}

function setUserData(data){
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
    window.localStorage.setItem('userstatus', data['user']['userstatus'])
    console.log(window.localStorage.getItem('userstatus'))
}
