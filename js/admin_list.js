window.addEventListener('load', () => {
    get_medicine_list();
});

function get_medicine_list(){
    // Отримання таблиці із списком продуктів з сервера
fetch('http://127.0.0.1:5000/api/v1/pharmacy/inventory')
.then(response => response.json())
.then(products => {
  // Знаходимо tbody елемент таблиці в HTML
  const tbody = document.querySelector('tbody');

  // Очищуємо tbody
  tbody.innerHTML = '';

  // Додаємо кожен продукт до tbody
  products.Medicine.forEach(product => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <a href="Item.html?id=${product.id}">
          ${product.name}
        </a>
      </td>
      <td>${product.price}</td>
      <td>${product.quantity}</td>
      <td>
        <div>
          <i class="fa-solid fa-trash" onclick="delete_medicine_by_id(${product.id})"></i>
        </div>
      </td>
      <td>
        <button class="update__btn">
          <a href="Update.html?id=${product.id}">Update item</a>
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
})
.catch(error => {
  console.error('Error fetching products', error);
});

}

function delete_medicine_by_id(id) {
    const token = window.localStorage.getItem('token')
    const headers = new Headers();
    headers.set('Authorization', 'Basic ' + token);
    headers.set('content-type', 'application/json');
    fetch('http://127.0.0.1:5000/api/v1/medicine/' + id, {
    method: 'DELETE',
    headers,
  })
  .then(response => {response.json();
    window.location.href = 'Delete.html';})
  .catch(error => {
    alert(error('Error', error))});
  ;
}