//import '../styles/add.scss';
import {useEffect, useState } from 'react';
import React from 'react';
import error_handler from '../utils/utils'

function Add() {
  const [name, setName] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState(1);
  const [medicineStatus, setMedicineStatus] = useState('');
  const [price, setPrice] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [demand, setDemand] = useState(0);
  const [image_url, setImage_url] = useState('');
  const [demand_count, setDemand_count] = useState(0);
  const [categories, setCategories] = useState([]);

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

  const handleAddItem = async (event) => {
    event.preventDefault();

    const entry = {
      medicine_name: name,
      manufacturer,
      medicine_description: description,
      category_id: categoryId,
      medicine_status: medicineStatus,
      price,
      quantity,
      demand,
      image_url,
      demand_count
    };

    const token = window.localStorage.getItem('token');
    const headers = new Headers();
    headers.set('Authorization', 'Basic ' + token);
    headers.set('content-type', 'application/json');

    try {
      const response = await fetch('http://127.0.0.1:5000/api/v1/medicine', {
        method: 'POST',
        body: JSON.stringify(entry),
        headers,
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      //window.localStorage.setItem('current_user', JSON.stringify(entry));
      window.location.href = '/update';
    } catch (error) {
      error_handler(error);
      console.log(`Fetch error: ${error}`);
    }
  };

  useEffect(() => {
    getCategoryList();
  }, []);

  return (
    <>
      <section className="common__section">
        <div className="text-center">
          <h1>Add item</h1>
        </div>
      </section>

      <div className="add">
        <div className="add__wrapper">
          <h2 className="add__title" data-testid="add">Add Item</h2>
          <div className="add__inputs">
            <div className="add__item">
              <div className="add__name">Name</div>
              <input
                data-testid='name'
                type="text"
                className="add__input"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="add__item">
              <div className="add__name" >Manufacturer</div>
              <input
              data-testid='manufacturer'
                type="text"
                className="add__input"
                id="manufacturer"
                value={manufacturer}
                onChange={(e) => setManufacturer(e.target.value)}
              />
            </div>
            <div className="add__item">
              <div className="add__name">Description</div>
              <input
              data-testid='description'
                type="text"
                className="add__input"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="add__item" >
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
            <div className="add__item" >
              <div className="add__name">Medicine status</div>
              <input
                data-testid="medicineStatus"
                type="text"
                className="add__input"
                id="medicine_status"
                list="status_options"
                value={medicineStatus}
                onChange={(e) => setMedicineStatus(e.target.value)}
              />
              <datalist id="status_options">
                <option value="available">Available</option>
                <option value="pending">Pending</option>
                <option value="sold">Sold</option>
              </datalist>
           </div>
           <div className="add__item" >
              <div className="add__name">Price</div>
              <input
              data-testid='price'
                type="number"
                className="add__input"
                min="1"
                max="5000"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="add__item">
              <div className="add__name" >Quantity</div>
              <input
              data-testid='quantity'
                type="number"
                className="add__input"
                min="1"
                max="5000"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="add__item" >
              <div className="add__name">Demand count</div>
              <input
              data-testid='demand_count'
                type="number"
                className="add__input"
                min="0"
                max="50000"
                id="demand_count"
                value={demand_count}
                onChange={(e) => setDemand_count(e.target.value)}
              />
            </div>
            <div className="add__item" >
              <div className="add__name">Demand</div>
              <input
              data-testid='demand'
                type="number"
                className="add__input"
                min="0"
                max="1"
                id="demand"
                value={demand}
                onChange={(e) => setDemand(e.target.value)}
              />
            </div>
            <div className="add__item" >
              <div className="add__name">Image url</div>
              <input
              data-testid='image_url'
                type="text"
                className="add__input"
                id="image_url"
                value={image_url}
                onChange={(e) => setImage_url(e.target.value)}
              />
            </div>
            <button class="add__btn" data-testid='add_btn' onClick={handleAddItem}>ADD</button>
            </div>
        </div>
    </div>
    </>
    )
}

export default Add;
