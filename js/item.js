const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

const apiUrl = 'http://127.0.0.1:5000/api/v1/medicine/' + id; // URL сервера API
const itemSection = document.querySelector('.item'); // отримуємо посилання на HTML-елемент, в який будуть вставлені дані
const titel = document.querySelector('.common__section');
fetch(apiUrl) // виконуємо запит до сервера
  .then(response => response.json()) // перетворюємо отриману відповідь на об'єкт JavaScript
  .then(data => { // обробляємо отримані дані
    let { category_id, demand, id_medicine, manufacturer, medicine_description, medicine_name, medicine_status, price, quantity } = data;

    // створюємо HTML-код для вставки
    fetch(`http://127.0.0.1:5000/api/v1/category/${category_id}`)
        .then(response => response.json()) // Перетворюємо отримані дані у формат JSON
        .then(subcategories => {
            let html1 = `<div class="text-center">
            <h1>${medicine_name.charAt(0).toUpperCase() + medicine_name.slice(1)}</h1>
            </div>`
            titel.innerHTML = html1;
            let html = `
            <img src='assets/image/items-img/hilka.jpg' alt="item" class="item__img" />
            <div class="item__descr">
                <h2 class="title-pt-0">${medicine_name}</h2>
                <Beans/>
                <div class="item__country">
                    <div class="item__country-title">
                        Category:
                    </div>
                    <div class="item__country-name">
                        ${subcategories.category_name}
                    </div>
                </div>
                <div class="item__description">
                    <div class="item__description-value">
                        <b>Category description:</b> ${subcategories.description}
                    </div>
                <div class="item__description">
                    <div class="item__description-value">
                        <b>Description:</b> ${medicine_description}
                    </div>
                </div>
                <div class="item__description">
                    <div class="item__description-value">
                        <b>Status:</b> ${medicine_status.charAt(0).toUpperCase() + medicine_status.slice(1)}
                    </div>
                </div>
                <div class="item__description">
                    <div class="item__description-value">
                        <b>Manufacturer:</b> ${manufacturer}
                    </div>
                </div>
                <div class="item__description">
                    <div class="item__description-value">
                        <b>Quantity:</b> ${quantity}
                    </div>
                </div>
                <div class="item__description">
                    <div class="item__description-value">
                        <b>Is on demand?:</b> ${demand ? 'Yes' : 'No'}
                    </div>
                </div>
                <div class="item__price">
                    <div class="item__price-title">
                        Price:
                    </div>
                    <div class="item__price-value">
                        ${price}$
                    </div>
                    <button class='buy__btn'>Add to card</button>
                </div>
                <div class="item__price">
                <div class="item__price-title">
                        Count:
                    </div>
                    <div class="item__price-value">
                        <input type="number" class="add__input" min="1" max="5000" id="quantity">
                    </div>
                </div>
                <div class="item__price">
                    <div class="item__price-title">
                        Not available?:
                    </div>
                    <button class='demand__btn'>Add to demand</button> 
                </div>
            </div>
          `;
          itemSection.innerHTML = html;
        let editButton = document.querySelector('.demand__btn');

            editButton.onclick = e => {
            e.preventDefault();
                const token = window.localStorage.getItem('token')
                    const id_user = window.localStorage.getItem('id_user')
                    const headers = new Headers();
                    headers.set('Authorization', 'Basic ' + token);
                    headers.set('content-type', 'application/json');
                    fetch('http://127.0.0.1:5000/api/v1/medicine/demand/' + id, {
                    method: 'PUT', 
                    headers,
                    })
                    .then(response => {
                        if (!response.ok) {
                           alert("Item available")
                        }
                        location.reload();
                    })
                    .catch(error => {
                        alert(error)
                        console.error(error)
                    })
            }
            const button = document.querySelector('.buy__btn');
            const quantity1 = document.getElementById("quantity")
                async function addToCart(medicine_id, quantity) {
                let cartItems = JSON.parse(localStorage.getItem("cartItems"));
                if (cartItems === null){
                    cartItems = []
                }
                let cartItem = cartItems.find(item => item.id === medicine_id);
                if (cartItem) {
                    cartItem.quantity = Number(cartItem.quantity) + 1;
                } else {
                    const response = await fetch('http://127.0.0.1:5000/api/v1/medicine/' + id, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                    });
                    const data = await response.json();
                    cartItem = {
                    id: medicine_id,
                    name: data.medicine_name,
                    price: data.price,
                    quantity: quantity.value
                    };
                    cartItems.push(cartItem);
                }
                // Save the cart items to cookies or local storage
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                window.location.href = 'ShopingCard.html';
                return cartItems;
                }

                button.addEventListener('click', async () => {
                    try {
                    const result = await addToCart(id, quantity1);
                    console.log(result);
                    } catch (error) {
                    console.error(error);
                    }
                });


        });
     // вставляємо HTML-код у відповідний HTML-елемент
  })
  .catch(error => console.error(error)); // обробляємо помилки, якщо вони виникають
