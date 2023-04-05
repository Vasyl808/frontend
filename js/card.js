function renderCartItems(cartItems) {
    const tableHead = document.querySelector('thead');
    const tableBody = document.querySelector('tbody');
    const res = document.querySelector(".card__subtotal-price");
    
    // очистити таблицю перед заповненням новими даними
    tableHead.innerHTML = '';
    tableBody.innerHTML = '';
  
    // створити заголовок таблиці
    const headRow = document.createElement('tr');
    const headImageCell = document.createElement('th');
    headImageCell.textContent = 'Image';
    const headTitleCell = document.createElement('th');
    headTitleCell.textContent = 'Title';
    const headPriceCell = document.createElement('th');
    headPriceCell.textContent = 'Price';
    const headQtyCell = document.createElement('th');
    headQtyCell.textContent = 'Qty';
    const headQtyAdd = document.createElement('th');
    headQtyAdd.textContent = 'Add';
    const headQtyMinus = document.createElement('th');
    headQtyMinus.textContent = 'Minus';
    const headDeleteCell = document.createElement('th');
    headDeleteCell.textContent = 'Delete';
  
    headRow.appendChild(headImageCell);
    headRow.appendChild(headTitleCell);
    headRow.appendChild(headPriceCell);
    headRow.appendChild(headQtyCell);
    headRow.appendChild(headQtyAdd);
    headRow.appendChild(headQtyMinus);
    headRow.appendChild(headDeleteCell);
  
    tableHead.appendChild(headRow);
    let total = 0;
    // створити рядки для кожного елемента корзини
    cartItems.forEach(item => {
      const row = document.createElement('tr');
      const imageCell = document.createElement('td');
      const imageLink = document.createElement('a');
      const image = document.createElement('img');
      image.src = `assets/image/items-img/hilka.jpg`;
      image.alt = item.name;
      imageLink.href = 'Item.html?id=' + item.id;
      imageLink.appendChild(image);
      imageCell.appendChild(imageLink);
  
      const titleCell = document.createElement('td');
      titleCell.textContent = item.name;
  
      const priceCell = document.createElement('td');
      priceCell.textContent = `$${item.price}`;
  
      const qtyCell = document.createElement('td');
      qtyCell.textContent = item.quantity;
  

      const addCell = document.createElement('td');
      const addButton = document.createElement('div');
      addButton.innerHTML = `
      <div class="fa-solid" onclick="count_add(${item.id})"> + </div>`
      addCell.appendChild(addButton)

      const minusCell = document.createElement('td');
      const minusButton = document.createElement('div');
      minusButton.innerHTML = `
      <div class="fa-solid" onclick="count_minus(${item.id})"> &#8722; </div>`
      minusCell.appendChild(minusButton)

      const deleteCell = document.createElement('td');
      const deleteButton = document.createElement('div');
      deleteButton.innerHTML = `<i class="fa-solid fa-trash" onClick="removeCartItemById(${item.id})"></i>`;
      deleteCell.appendChild(deleteButton);

      row.appendChild(imageCell);
      row.appendChild(titleCell);
      row.appendChild(priceCell);
      row.appendChild(qtyCell);
      row.appendChild(addCell);
      row.appendChild(minusCell);
      row.appendChild(deleteCell);
  
      tableBody.appendChild(row);
      total += (item.price * item.quantity)
    }
    );

    res.textContent = "$" + Number(total);
  }
  
  // викликати функцію з даними корзини
  window.addEventListener('load', () => {
    let cartItems = window.localStorage.getItem("cartItems")
    //console.log(cartItems === null)
    if (cartItems === null){
      cartItems = []
      renderCartItems(cartItems);
      const checkout = document.getElementById('checkout');
      if(localStorage.getItem('token') === null){
        checkout.insertAdjacentHTML("beforeend",
        '<a href="Login.html">Checkout</a>');
      } else {
        checkout.insertAdjacentHTML("beforeend",
        '<a href="Checkout.html">Checkout</a>');
      }
    }
    else{
      const cartItems = JSON.parse(window.localStorage.getItem("cartItems")); 
      renderCartItems(cartItems);
      const checkout = document.getElementById('checkout');
      if(localStorage.getItem('token') === null){
        checkout.insertAdjacentHTML("beforeend",
        '<a href="Login.html">Checkout</a>');
      } else {
        checkout.insertAdjacentHTML("beforeend",
        '<a href="Checkout.html">Checkout</a>');
      }
    }
    
  });

  function removeCartItemById(medicine_id) {
    let cartItems = JSON.parse(window.localStorage.getItem("cartItems")); 
    const index = cartItems.findIndex(item => item.id == medicine_id);
    if (index !== -1) {
      cartItems.splice(index, 1);
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    renderCartItems(cartItems)
  }

  function count_add(medicine_id){
    let cartItems = JSON.parse(window.localStorage.getItem("cartItems")); 
    //console.log(cartItems)
    let cartItem = cartItems.find(item => item.id == Number(medicine_id));
    if (cartItem) {
      cartItem.quantity = Number(cartItem.quantity) + 1;
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    renderCartItems(cartItems)
  }

  function count_minus(medicine_id){
    let cartItems = JSON.parse(window.localStorage.getItem("cartItems")); 
    //console.log(cartItems)
    let cartItem = cartItems.find(item => item.id == Number(medicine_id));
    //console.log(cartItem);
    if (cartItem) {
      cartItem.quantity = Number(cartItem.quantity) - 1;
      //console.log(cartItem.quantity === 0)
      if(cartItem.quantity === 0){
        let cartItems = JSON.parse(window.localStorage.getItem("cartItems")); 
        const index = cartItems.findIndex(item => item.id == medicine_id);
        if (index !== -1) {
          cartItems.splice(index, 1);
        }
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        renderCartItems(cartItems)

      }
      else{
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        renderCartItems(cartItems)
      }
    }
  }