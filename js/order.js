window.addEventListener('load', () => {
    getUser();
    load_total();
    const button = document.getElementById("buy")
    button.addEventListener('click', start);
  });

function start(event){
    event.preventDefault();
    const id_user = window.localStorage.getItem('id_user')
    const street = document.getElementById('street');
    const city = document.getElementById('city');
    const code = document.getElementById('code');
    const country = document.getElementById('country');
    const body = {
        user_id: Number(id_user),
        address: String(street.value + ", " + city.value + ", " + code.value + ", " + country.value),
      };
    const token = window.localStorage.getItem('token')
    const headers = new Headers();
    headers.set('Authorization', 'Basic ' + token);
    headers.set('content-type', 'application/json');
    fetch('http://127.0.0.1:5000/api/v1/pharmacy/order', {
        method: 'POST',
        body: JSON.stringify(body),
        headers
    })
    .then(response=> {
        // Перевірка, що запит відповів успішно
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        // Отримати тіло відповіді в форматі JSON
        return response.json();
    })
    .then(data => {
        console.log(data);
        let cartItems = JSON.parse(window.localStorage.getItem("cartItems"));
        let promises = [];
        cartItems.forEach(item => {
            const token = window.localStorage.getItem('token')
            const id_order = data.id_order
            const details = {
                order_id: Number(id_order),
                medicine_id: Number(item.id),
                count: Number(item.quantity)
            }
            const headers = new Headers();
            headers.set('Authorization', 'Basic ' + token);
            headers.set('content-type', 'application/json');
            promises.push(fetch('http://127.0.0.1:5000/api/v1/pharmacy/order/medicine', {
                method: 'POST',
                body: JSON.stringify(details),
                headers,
            })
            .catch(error => {
                // Обробити помилку
                console.error('There was a problem with the network request:', error);
            }));
            return Promise.all(promises)
        })
        let cartItems1 = []
        localStorage.setItem('cartItems', JSON.stringify(cartItems1));
        alert("Покупка пройшла успішно")
        window.location.href = 'index.html';
    })
    .catch(error => {
        // Обробити помилку
        console.error('There was a problem with the network request:', error);
    });
}

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
    let form = document.querySelector('.form');
    form["name"].value = data['user']['first_name'];
    form["email"].value = data['user']['email'];
    form["number"].value = data['user']['phone_number'];
}

function load_total(){
    const cartData = JSON.parse(window.localStorage.getItem("cartItems"));
    console.log(cartData === null);
    if (cartData === null){
        let total_count = 0;
        let total_price = 0;
        var checkoutWrapper = document.querySelector(".checkout__wrapper");
        var html = '<div>Total Qty: <span>' + total_count + ' items</span></div>' +
           '<div>Subtotal: <span>' + total_price + '</span></div>' +
           '<div>Shipping: <span>' + 0 + '</span></div>' +
           '<div>Total cost: <span>' + total_price + '</span></div>' +
           '<button class="buy__btn-w-150" type="button" id="buy">Place an order</button>';
        checkoutWrapper.innerHTML = html;
    }
    else{
        let total_count = 0;
        let total_price = 0;
        cartData.forEach(item => {
            total_count += Number(item.quantity);
            total_price += Number(item.price);
        })
        var checkoutWrapper = document.querySelector(".checkout__wrapper");
        var html = '<div>Total Qty: <span>' + Number(total_count) + ' items</span></div>' +
            '<div>Subtotal: <span>' + Number(total_price) + '</span></div>' +
            '<div>Shipping: <span>' + 0 + '</span></div>' +
            '<div>Total cost: <span>' + Number(total_price) + '</span></div>' +
            '<button class="buy__btn-w-150" type="button" id="buy">Place an order</button>';
        checkoutWrapper.innerHTML = html;
    }

}

