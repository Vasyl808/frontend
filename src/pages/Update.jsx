import '../styles/delete.scss';
import image from '../assets/image/items-img/hilka.jpg'
import { useEffect, useState } from 'react';

function Update() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getMedicineList();
  }, []);

  function getMedicineList() {
    // Отримання таблиці із списком продуктів з сервера
    fetch('http://127.0.0.1:5000/api/v1/pharmacy/inventory')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.Medicine);
      })
      .catch((error) => {
        console.error('Error fetching products', error);
      });
  }

  function deleteMedicineById(id) {
    const token = window.localStorage.getItem('token');
    const headers = new Headers();
    headers.set('Authorization', 'Basic ' + token);
    headers.set('content-type', 'application/json');
    fetch('http://127.0.0.1:5000/api/v1/medicine/' + id, {
      method: 'DELETE',
      headers,
    })
      .then((response) => {
        if (response.ok) {
          getMedicineList();
        } else {
          throw new Error('Error deleting product');
        }
      })
      .catch((error) => {
        alert('Error', error);
      });
  }

  return (
    <>
      <section className="common__section">
        <div className="text-center">
          <h1>Delete Item</h1>
        </div>
      </section>
      <h2 className="delete__title">Delete Item</h2>
      <div className="delete">
        {
        products.length === 0 ? (<h2 className='fs-4 text-center'>No item</h2>) : (
        <table id="table" className="bordered">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Delete</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <img src={image} className='img-small' alt=''/>
                </td>
                <td>
                  <a href={`/shop/${product.id}`}>{product.name}</a>
                </td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>
                  <div>
                    <i
                      className="fa-solid fa-trash"
                      onClick={() => deleteMedicineById(product.id)}
                    ></i>
                  </div>
                </td>
                <td>
                  <button className="update__btn">
                    <a href={`update-item/${product.id}`}>Update item</a>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        )
        }
      </div>
    </>
  );
}

export default Update;