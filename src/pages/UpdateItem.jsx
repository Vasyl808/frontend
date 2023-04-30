//import '../styles/add.scss';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import error_handler from '../utils/utils'

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
  };
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

    const nameInput = document.querySelector(
      '.add__inputs .add__item:nth-child(1) input'
    );
    const manufacturerInput = document.querySelector(
      '.add__inputs .add__item:nth-child(2) input'
    );
    const descriptionInput = document.querySelector(
      '.add__inputs .add__item:nth-child(3) input'
    );
    const categoryIdInput = document.querySelector(
      '.add__inputs .add__item:nth-child(4) input'
    );
    const priceInput = document.querySelector(
      '.add__inputs .add__item:nth-child(5) input'
    );
    const quantityInput = document.querySelector(
      '.add__inputs .add__item:nth-child(6) input'
    );
    const demandInput = document.querySelector(
      '.add__inputs .add__item:nth-child(7) input'
    );
    const statusInput = document.querySelector(
      '.add__inputs .add__item:nth-child(8) input'
    );
    const image_urlInput = document.querySelector(
      '.add__inputs .add__item:nth-child(9) input'
    );
    const demand_countInput = document.querySelector(
      '.add__inputs .add__item:nth-child(10) input'
    );

    const body = {
      medicine_name: nameInput.value,
      manufacturer: manufacturerInput.value,
      medicine_description: descriptionInput.value,
      category_id: Number(categoryIdInput.value),
      price: Number(priceInput.value),
      quantity: Number(quantityInput.value),
      demand: Number(demandInput.value === '1' ? true : false),
      medicine_status: statusInput.value,
      image_url: image_urlInput.value,
      demand_count: demand_countInput.value
    };

    updateMedicine(id, body);
    window.location.reload();
    window.location.href = '/home'
  };

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
                    <div className="add__name">Category id</div>
                    <input type="number" data-testid="categoryId" className="add__input" min="1" max="50" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} />
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
                    <input type="text" data-testid="medicine_status" className="add__input" value={medicine_status} onChange={(e) => setStatus(e.target.value)} />
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