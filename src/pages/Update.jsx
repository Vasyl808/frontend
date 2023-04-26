import '../styles/delete.scss';
import image from '../assets/image/items-img/hilka.jpg'
import { useEffect, useState } from 'react';
import error_handler from '../utils/utils'

function Update() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getMedicineList();
  }, []);

  function getMedicineList() {
    // Отримання таблиці із списком продуктів з сервера
    fetch('http://127.0.0.1:5000/api/v1/pharmacy/inventory')
      .then(async response => {
        if (!response.ok) {
          const error = await response.text();
          throw new Error(error);
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data.Medicine);
      })
      .catch((error) => {
        error_handler(error);
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
      .then(async (response) => {
        if (response.ok) {
          getMedicineList();
        } else {
          throw new Error(await response.text());
        }
      })
      .catch((error) => {
        error_handler(error)
      });
  }
  console.log(products);
  const filterMedicine = (searchText, listOfMedicine) => {
    if (!searchText || !listOfMedicine) {
      return listOfMedicine;
    }
    return listOfMedicine.filter(({ name }) =>
      name.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  const filteredMedicine = filterMedicine(searchTerm, products);

  return (
    <>
      <section className="common__section">
        <div className="text-center">
          <h1>Item list</h1>
        </div>
      </section>
                <div className="filter__elem">
                <div className="filter__look-title">
                            Lookiing for
                        </div>
                        <input onChange={(e) => setSearchTerm(e.target.value)} type="text" placeholder="start typing here..." className="filter__look-input" />
                </div>
                <hr className="filter__hr" />
      <div className="delete">
        {
        filteredMedicine.length === 0 ? (<h2 className='fs-4 text-center'>No item</h2>) : (
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
            {filteredMedicine.map((product) => (
              <tr key={product.id}>
                <td>
                  <img src={product.image_url} className='img-small' alt=''/>
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