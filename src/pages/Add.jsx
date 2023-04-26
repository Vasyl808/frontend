import '../styles/add.scss';
import { useState } from 'react';
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
  const [demand_count, setDemand_count] = useState(null);

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
      window.location.href = '/admin';
    } catch (error) {
      error_handler(error);
      console.log(`Fetch error: ${error}`);
    }
  };

  return (
    <>
      <section className="common__section">
        <div className="text-center">
          <h1>Add item</h1>
        </div>
      </section>

      <div className="add">
        <div className="add__wrapper">
          <h2 className="add__title">Add Item</h2>
          <div className="add__inputs">
            <div className="add__item">
              <div className="add__name">Name</div>
              <input
                type="text"
                className="add__input"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="add__item">
              <div className="add__name">Manufacturer</div>
              <input
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
                type="text"
                className="add__input"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="add__item">
              <div className="add__name">Category id</div>
              <input
                type="number"
                className="add__input"
                min="1"
                max="50"
                id="c_id"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              />
            </div>
            <div className="add__item">
              <div className="add__name">Medicine status</div>
              <input
                type="text"
                className="add__input"
                id="medicine_status"
                value={medicineStatus}
                onChange={(e) => setMedicineStatus(e.target.value)}
              />
           </div>
           <div className="add__item">
              <div className="add__name">Price</div>
              <input
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
              <div className="add__name">Quantity</div>
              <input
                type="number"
                className="add__input"
                min="1"
                max="5000"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="add__item">
              <div className="add__name">Demand count</div>
              <input
                type="number"
                className="add__input"
                min="1"
                max="50000"
                id="demand_count"
                value={demand_count}
                onChange={(e) => setDemand_count(e.target.value)}
              />
            </div>
            <div className="add__item">
              <div className="add__name">Demand</div>
              <input
                type="number"
                className="add__input"
                min="0"
                max="1"
                id="demand"
                value={demand}
                onChange={(e) => setDemand(e.target.value)}
              />
            </div>
            <div className="add__item">
              <div className="add__name">Image url</div>
              <input
                type="text"
                className="add__input"
                id="image_url"
                value={image_url}
                onChange={(e) => setImage_url(e.target.value)}
              />
            </div>
            <button class="add__btn" onClick={handleAddItem}>ADD</button>
            </div>
        </div>
    </div>
    </>
    )
}

export default Add;
