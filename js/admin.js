const button = document.querySelector('.add__btn');

function add_item(body) {
  const token = window.localStorage.getItem('token')
    const id_user = window.localStorage.getItem('id_user')
    const headers = new Headers();
    headers.set('Authorization', 'Basic ' + token);
    headers.set('content-type', 'application/json');
  return fetch('http://127.0.0.1:5000/api/v1/medicine', {
    method: 'POST',
    body: JSON.stringify(body),
    headers,
  });
}

async function buttonHandler(event) {
    event.preventDefault();

    const name = document.getElementById('name');
    const manufacturer = document.getElementById('manufacturer');
    const description = document.getElementById('description');
    const c_id = document.getElementById('c_id');
    const price = document.getElementById('price');
    const quantity = document.getElementById('quantity');
    const medicine_status = document.getElementById('medicine_status');
    const demand = document.getElementById('demand');

    const entry = {
      medicine_name: name.value,
      manufacturer: manufacturer.value,
      medicine_description: description.value,
      category_id: c_id.value,
      medicine_status: medicine_status.value,
      price: price.value,
      quantity: quantity.value,
      demand: demand.value
    };
    add_item(entry)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(await response.text());
        }
        return response.text();
      })
      .then(() => {
        //window.localStorage.setItem('current_user', JSON.stringify(entry));
        window.location.href = 'Admin.html';
      })
      .catch((error) => {
        alert(error)
        console.log(`Fetch error: ${error}`);
      });
  }

button.addEventListener('click', buttonHandler);