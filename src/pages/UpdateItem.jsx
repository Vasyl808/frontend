import '../styles/add.scss';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        window.location.href = 'login.html';
      })
      .then((data) => {
        setMedicine(data);
      });
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

    const body = {
      medicine_name: nameInput.value,
      manufacturer: manufacturerInput.value,
      medicine_description: descriptionInput.value,
      category_id: Number(categoryIdInput.value),
      price: Number(priceInput.value),
      quantity: Number(quantityInput.value),
      demand: Number(demandInput.value === '1' ? true : false),
      medicine_status: statusInput.value,
    };

    updateMedicine(id, body);
    window.location.href = '/shop/' + id
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
                    <input type="text" className="add__input" value={medicine_name} onChange={(e) => setMedicine_name(e.target.value)} />
                </div>
                <div className="add__item">
                    <div className="add__name">Manufacturer</div>
                    <input type="text" className="add__input" value={manufacturer} onChange={(e) => setManufacturer(e.target.value)} />
                </div>
                <div className="add__item">
                    <div className="add__name">Description</div>
                    <input type="text" className="add__input" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="add__item">
                    <div className="add__name">Category id</div>
                    <input type="number" className="add__input" min="1" max="50" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} />
                </div>
                <div className="add__item">
                    <div className="add__name">Price</div>
                    <input type="number" className="add__input" min="1" max="5000" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div className="add__item">
                    <div className="add__name">Quantity</div>
                    <input type="number" className="add__input" min="1" max="5000" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                </div>
                <div className="add__item">
                    <div className="add__name">Demand</div>
                    <input type="number" className="add__input"  min="0" max="1" value={demand} onChange={(e) => setDemand(e.target.value)} />
                </div>
                <div className="add__item">
                    <div className="add__name">Status</div>
                    <input type="text" className="add__input" value={medicine_status} onChange={(e) => setStatus(e.target.value)} />
                </div>
                <button className="add__btn" onClick={handleSubmit}>Update</button>
            </div>
        </div>
    </div>
    </>
    );
}
    
export default UpdateItem;