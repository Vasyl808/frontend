const logout = document.getElementById('logout_btn');

async function formHandler(event) {
  event.preventDefault();
  console.log(localStorage)
  window.localStorage.clear();
  window.location.href = 'index.html'; 
}

logout.addEventListener('click', formHandler);