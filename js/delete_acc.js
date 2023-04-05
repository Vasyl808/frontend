const form = document.getElementById('delete_btn');

function deleteUser() {
    const token = window.localStorage.getItem('token')
    const id_user = window.localStorage.getItem('id_user')
    const headers = new Headers();
    headers.set('Authorization', 'Basic ' + token);
    headers.set('content-type', 'application/json');
    return fetch('http://127.0.0.1:5000/api/v1/user/' + id_user, {
    method: 'DELETE',
    headers,
  });
}

async function formHandler(event) {
  event.preventDefault();
  deleteUser()
    .then(async (response) => {
      if (!response.ok) {
        alert(response)
        throw new Error(await response.text());
      }
      return response.text();
    })
    .then(() => {
      window.localStorage.clear();
      window.location.href = 'login.html';
    })
    .catch((error) => {
      alert(error)
      console.log(`Fetch error: ${error}`);
    });
}

form.addEventListener('click', formHandler);