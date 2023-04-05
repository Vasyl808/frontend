const button = document.querySelector('.add__btn');

function set_medicine(medicineData){
    const nameInput = document.querySelector('.add__inputs .add__item:nth-child(1) input');
    const manufacturerInput = document.querySelector('.add__inputs .add__item:nth-child(2) input');
    const descriptionInput = document.querySelector('.add__inputs .add__item:nth-child(3) input');
    const categoryIdInput = document.querySelector('.add__inputs .add__item:nth-child(4) input');
    const priceInput = document.querySelector('.add__inputs .add__item:nth-child(5) input');
    const quantityInput = document.querySelector('.add__inputs .add__item:nth-child(6) input');
    const demandInput = document.querySelector('.add__inputs .add__item:nth-child(7) input');
    const statusInput = document.querySelector('.add__inputs .add__item:nth-child(8) input');
    nameInput.value = medicineData.medicine_name;
    manufacturerInput.value = medicineData.manufacturer;
    descriptionInput.value = medicineData.medicine_description;
    categoryIdInput.value = medicineData.category_id;
    priceInput.value = medicineData.price;
    quantityInput.value = medicineData.quantity;
    demandInput.value = medicineData.demand ? 1 : 0;
    statusInput.value = medicineData.medicine_status;
}

function load(){
    const token = window.localStorage.getItem('token')
        const headers = new Headers();
        headers.set('Authorization', 'Basic ' + token);
        headers.set('content-type', 'application/json');
        const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    fetch('http://127.0.0.1:5000/api/v1/medicine/' + id, {
        method: 'GET',
        headers: headers
    }).then((response) => {
        if (response.status === 200) {
            return response.json();
        }
        window.location.href = 'login.html';
    }).then(data => {
        set_medicine(data);
    })
}

window.addEventListener('load', () => {
    load();
  });

  function update_medicine(id, body) {
    const token = window.localStorage.getItem('token')
      const headers = new Headers();
      headers.set('Authorization', 'Basic ' + token);
      headers.set('content-type', 'application/json');
    return fetch('http://127.0.0.1:5000/api/v1/medicine/' + id, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers,
    });
  }
  
  async function buttonHandler(event) {
      event.preventDefault();
  
      const nameInput = document.querySelector('.add__inputs .add__item:nth-child(1) input');
    const manufacturerInput = document.querySelector('.add__inputs .add__item:nth-child(2) input');
    const descriptionInput = document.querySelector('.add__inputs .add__item:nth-child(3) input');
    const categoryIdInput = document.querySelector('.add__inputs .add__item:nth-child(4) input');
    const priceInput = document.querySelector('.add__inputs .add__item:nth-child(5) input');
    const quantityInput = document.querySelector('.add__inputs .add__item:nth-child(6) input');
    const demandInput = document.querySelector('.add__inputs .add__item:nth-child(7) input');
    const statusInput = document.querySelector('.add__inputs .add__item:nth-child(8) input');
      const entry = {
        medicine_name: nameInput.value,
        manufacturer: manufacturerInput.value,
        medicine_description: descriptionInput.value,
        category_id: Number(categoryIdInput.value),
        medicine_status: statusInput.value,
        price: Number(priceInput.value),
        quantity: Number(quantityInput.value),
        demand: Number(demandInput.value)
      };
      const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
      update_medicine(id, entry)
        .then(async (response) => {
          if (!response.ok) {
            throw new Error(await response.text());
          }
          return response.text();
        })
        .then(() => {
          //window.localStorage.setItem('current_user', JSON.stringify(entry));
          window.location.href = 'Delete.html';
        })
        .catch((error) => {
          alert(error)
          console.log(`Fetch error: ${error}`);
        });
    }
  
  button.addEventListener('click', buttonHandler);