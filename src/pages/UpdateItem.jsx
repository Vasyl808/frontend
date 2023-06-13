//import '../styles/add.scss';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import error_handler from '../utils/utils'
import Spinner from '../components/Spinner/Spinner';

function UpdateItem() {
  const [medicineData, setMedicineData] = useState({});
    const [medicine_name, setMedicine_name] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [demand, setDemand] = useState('');
    const [medicine_status, setStatus] = useState('');
    const [image_url, setImage_url] = useState('');
    const [demand_count, setDemand_count] = useState(null);
    const [categories, setCategories] = useState([]);
    const status_list = ["available", "pending", "sold"]
    const [isLoading, setIsLoading] = useState(true);

  const setMedicine = (medicine) => {
    setMedicineData(medicine);
    setMedicine_name(medicine.medicine_name)
    setManufacturer(medicine.manufacturer)
    setDescription(medicine.medicine_description)
    setCategoryId(medicine.category_id)
    setPrice(medicine.price)
    setQuantity(medicine.quantity)
    setDemand(Number(medicine.demand))
    setStatus(medicine.medicine_status)
    setImage_url(medicine.image_url)
    setDemand_count(medicine.demand_count)
    console.log(medicine);
    setIsLoading(false);
  };

  function getCategoryList() {
    // Отримання таблиці із списком продуктів з сервера
    //const headers = new Headers();
    //const token = window.localStorage.getItem('token');
    //headers.set('Authorization', 'Basic ' + token);
    //headers.set('content-type', 'application/json');
    fetch('http://127.0.0.1:5000/api/v1/pharmacy/category-list')
      .then(async response => {
        if (!response.ok) {
          const error = await response.text();
          throw new Error(error);
        }
        return response.json();
      })
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        error_handler(error);
        console.error('Error fetching products', error);
      });
  }

  const {id} = useParams();
  const load = () => {
    const token = window.localStorage.getItem('token');
    const headers = new Headers();
    headers.set('Authorization', 'Basic ' + token);
    headers.set('content-type', 'application/json');
    //const urlParams = new URLSearchParams(window.location.search);
    console.log(id); 
    fetch('http://127.0.0.1:5000/api/v1/medicine/' + id, {
      method: 'GET',
      headers: headers,
    })
    .then(async response => {
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }
      return response.json();
    })
      .then((data) => {
        setMedicine(data);
      })
      .catch(error => error_handler(error));
  };

  useEffect(() => {
    load();
    getCategoryList();
  }, []);

  const updateMedicine = (id, body) => {
    const token = window.localStorage.getItem('token');
    const headers = new Headers();
    headers.set('Authorization', 'Basic ' + token);
    headers.set('content-type', 'application/json');
    return fetch('http://127.0.0.1:5000/api/v1/medicine/' + id, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const body = {
      medicine_name: medicine_name,
      manufacturer: manufacturer,
      medicine_description: description,
      category_id: Number(categoryId),
      price: Number(price),
      quantity: Number(quantity),
      demand: Number(demand === '1' ? true : false),
      medicine_status: medicine_status,
      image_url: image_url,
      demand_count: demand_count
    };

    updateMedicine(id, body);
    window.location.reload();
    window.location.href = '/update'
  };


  if (isLoading) {
    return <Spinner/>; // Показуємо завантажувальний екран
  }

  return (
    <>
      <section className="common__section">
        <div className="text-center">
          <h1>Update Item</h1>
        </div>
      </section>

      <div className="add">
        <div className="add__wrapper">
          <h2 className="add__title">{medicine_name}</h2>
          <div className="add__inputs">
                <div className="add__item">
                    <div className="add__name">Name</div>
                    <input type="text" data-testid="medicine_name" className="add__input" value={medicine_name} onChange={(e) => setMedicine_name(e.target.value)} />
                </div>
                <div className="add__item">
                    <div className="add__name">Manufacturer</div>
                    <input type="text" data-testid="manufacturer" className="add__input" value={manufacturer} onChange={(e) => setManufacturer(e.target.value)} />
                </div>
                <div className="add__item">
                    <div className="add__name">Description</div>
                    <input type="text" data-testid="description" className="add__input" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="add__item">
                    <div className="add__name">Category</div>
                    <select
                  data-testid="categoryId"
                  className="add__input"
                  id="c_id"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category.id_category} value={category.id_category}>
                      {category.category_name}
                    </option>
                  ))}
                     </select>
                </div>
                <div className="add__item">
                    <div className="add__name">Price</div>
                    <input type="number" data-testid="price" className="add__input" min="1" max="5000" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div className="add__item">
                    <div className="add__name">Quantity</div>
                    <input type="number" data-testid="quantity" className="add__input" min="1" max="5000" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                </div>
                <div className="add__item">
                    <div className="add__name">Demand</div>
                    <input type="number" data-testid="demand" className="add__input"  min="0" max="1" value={demand} onChange={(e) => setDemand(e.target.value)} />
                </div>
                <div className="add__item">
                    <div className="add__name">Status</div>
                    <select
                  data-testid="medicineStatus"
                  className="add__input"
                  id="medicine_status"
                  value={medicine_status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  {status_list.map((stat) => (
                    <option key={stat} value={stat}>
                      {stat}
                    </option>
                  ))}
                     </select>
                </div>
                <div className="add__item">
                    <div className="add__name">Image url</div>
                    <input type="text" data-testid="image_url" className="add__input" value={image_url} onChange={(e) => setImage_url(e.target.value)} />
                </div>
                <div className="add__item">
                    <div className="add__name">Demand count</div>
                    <input type="text" data-testid="demand_count" className="add__input" value={demand_count} onChange={(e) => setDemand_count(e.target.value)} />
                </div>
                <button className="add__btn"  data-testid="update_btn" onClick={handleSubmit}>Update</button>
            </div>
        </div>
    </div>
    </>
    );
}
    
export default UpdateItem;