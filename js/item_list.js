const productWrapper = document.querySelector('.product__wrapper');

fetch('http://127.0.0.1:5000/api/v1/pharmacy/inventory')
  .then(response => response.json())
  .then(data => {
    //const product = document.createElement('div');
    //product.classList.add('product');
    //const product__wrapper = document.createElement('div');
    //product__wrapper.classList.add('product__wrapper');
    let i = 0;
    try {
    data.Medicine.forEach(medicine => {
        if (i === 3) {
            throw BreakException;
          }
      const productBlock = document.createElement('div');
      productBlock.classList.add('product__block');

      const link = document.createElement('a');
      link.href = `Item.html?id=${medicine.id}`;

      const image = document.createElement('img');
      image.src = 'assets/image/items-img/hilka.jpg';
      image.alt = '';
      image.classList.add('product__img');

      link.appendChild(image);
      productBlock.appendChild(link);

      const productLink = document.createElement('a');
      productLink.href = `Item.html?id=${medicine.id}`;
      productLink.classList.add('product__link');

      const productTitle = document.createElement('div');
      productTitle.classList.add('product__title');
      productTitle.textContent = medicine.name;

      productLink.appendChild(productTitle);
      productBlock.appendChild(productLink);

      const productCountry = document.createElement('div');
      productCountry.classList.add('product__country');
        productCountry.textContent = medicine.medicine_status.charAt(0).toUpperCase() + medicine.medicine_status.slice(1);
      productBlock.appendChild(productCountry);

      const productPrice = document.createElement('div');
      productPrice.classList.add('product__price');

      const productAdd = document.createElement('div');
      productAdd.classList.add('product__add');

      const productAddItem = document.createElement('div');
      productAddItem.innerHTML = `
      <div class="product__add-item" onclick="addToCart(${medicine.id})"> + </div>`

      productAdd.appendChild(productAddItem);
      productPrice.appendChild(productAdd);

      const priceValue = document.createElement('div');
      priceValue.textContent = `$${medicine.price}`;

      productPrice.appendChild(priceValue);
      productBlock.appendChild(productPrice);

      // вставляємо створені елементи в DOM
      productWrapper.appendChild(productBlock);
      i ++;
    });
    }
    catch (e){
      }
  })
  .catch(error => {
        alert(error)
        console.error(error)
    }
   ); // обробляємо можливі помилки


  async function addToCart(medicine_id) {
      let cartItems = JSON.parse(localStorage.getItem("cartItems"));
      if (cartItems === null){
          cartItems = []
      }
      let cartItem = cartItems.find(item => item.id === medicine_id);
      if (cartItem) {
          cartItem.quantity = Number(cartItem.quantity) + 1;
      } else {
          const response = await fetch('http://127.0.0.1:5000/api/v1/medicine/' + medicine_id, {
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
          quantity: Number(1)
          };
          cartItems.push(cartItem);
      }
      // Save the cart items to cookies or local storage
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      window.location.href = 'ShopingCard.html';
      return cartItems;
    }