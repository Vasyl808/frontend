import { useSelector } from "react-redux";
import { Formik, Form, useField, Field } from 'formik';
import * as Yup from "yup";
import { toast } from 'react-toastify';
import React, { useState, useEffect } from 'react';
import error_handler from '../utils/utils'
import Spinner from '../components/Spinner/Spinner';

//import '../styles/checkout.scss';

const Checkout = () => {

    const [userData, setUserData] = useState({});
    const [total, setTotal] = useState(null);
    const [totalprice, setTotalprice] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
      const token = window.localStorage.getItem('token');
      const id_user = window.localStorage.getItem('id_user');
      const headers = new Headers();
      headers.set('Authorization', 'Basic ' + token);
      headers.set('content-type', 'application/json');
  
      fetch(`http://127.0.0.1:5000/api/v1/user/${id_user}`, {
        method: 'GET',
        headers: headers,
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          }
          window.location.href = '/login';
        })
        .then((data) => {
          console.log(data.user);
          setUserData(data.user);
        })
        .catch(error => {
          //alert(error)
          error_handler(error)
          console.error(error)
      });;
        loadTotal();
        //const button = document.getElementById("buy")
        //button.addEventListener('click', start);
    }, []);

  const start = (event) => {
    event.preventDefault();
    const id_user = window.localStorage.getItem('id_user');
    const street = document.getElementById('street').value;
    const city = document.getElementById('city').value;
    const code = document.getElementById('code').value;
    const country = document.getElementById('country').value;
    const body = {
      user_id: Number(id_user),
      address: `${street}, ${city}, ${code}, ${country}`,
    };
    const token = window.localStorage.getItem('token');
    const headers = new Headers();
    headers.set('Authorization', `Basic ${token}`);
    headers.set('content-type', 'application/json');
    fetch('http://127.0.0.1:5000/api/v1/pharmacy/order', {
      method: 'POST',
      body: JSON.stringify(body),
      headers,
    })
      .then(async response => {
        if (!response.ok) {
          const error = await response.text();
          error_handler(error);
        }
        return response.json();
      })
      .then((data) => {
        let cartItems = JSON.parse(window.localStorage.getItem('cartItems'));
        let promises = [];
        cartItems.forEach((item) => {
          const token = window.localStorage.getItem('token');
          const id_order = data.id_order;
          const details = {
            order_id: Number(id_order),
            medicine_id: Number(item.id),
            count: Number(item.quantity),
          };
          const headers = new Headers();
          headers.set('Authorization', `Basic ${token}`);
          headers.set('content-type', 'application/json');
          promises.push(
            fetch('http://127.0.0.1:5000/api/v1/pharmacy/order/medicine', {
              method: 'POST',
              body: JSON.stringify(details),
              headers,
            }).catch((error) => {
              error_handler(error);
              console.error('There was a problem with the network request:', error);
            })
          );
        });
        Promise.all(promises)
          .then(() => {
            let cartItems1 = [];
            localStorage.setItem('cartItems', JSON.stringify(cartItems1));
            localStorage.setItem('totalAmount', 0);
            localStorage.setItem('totalQuantity', 0);
            //alert('Покупка пройшла успішно');
            toast.success("The purchase was successful", {
              position: toast.POSITION.TOP_CENTER,
            autoClose: 15000 // в мілісекундах
          });
            window.location.href = '/user-shopping-list/' + Number(id_user);
          })
          .catch((error) => {
            error_handler(error);
            console.error('There was a problem with the network request:', error);
          });
      })
      .catch((error) => {
        error_handler(error);
        console.error('There was a problem with the network request:', error);
      });
  };

  const loadTotal = () => {
    const cartData = JSON.parse(window.localStorage.getItem("cartItems"));
    console.log(cartData === null);
    if (cartData === null){
        let total_count = 0;
        let total_price = 0;
        setTotal(total_count);
        setTotalprice(total_price);
    }
    else{
        let total_count = 0;
        let total_price = 0;
        cartData.forEach(item => {
            total_count += Number(item.quantity);
            total_price += Number(item.price * item.quantity);
        })
        setTotal(total_count);
        setTotalprice(total_price);
    }
    setIsLoading(false);
  }

  if (isLoading) {
    return <Spinner/>; // Показуємо завантажувальний екран
  }

    return (
        <>
          <section className="bgc">
            <h2 className="bgc__title">Checkout</h2>
          </section>
          <form className="form" onSubmit={start} >
            <div className="input__wrapper">
              <input
              required
                placeholder="Enter your name"
                id="name"
                name="name"
                type="text"
                defaultValue={userData.first_name}
              />
              <input
              required
                placeholder="Enter your email"
                id="email"
                name="email"
                type="email"
                defaultValue={userData.email}
              />
              <input
              required
              type="tel"
                placeholder="Phone number like 123-4567-8901"
                id="number"
                name="number"
                defaultValue={userData.phone_number}
              />
              <input
              required
                placeholder="Street address"
                id="street"
                name="street"
                type="text"
              />
              <input placeholder="City" id="city" name="city" type="text" />
              <input
              required
                placeholder="Postal code"
                id="code"
                name="code"
                type="number"
              />
              <input
              required
                placeholder="Country"
                id="country"
                name="country"
                type="text"
              />
            </div>
    
            <div className="checkout">
              <div className="checkout__wrapper">
              <div>Total Qty: 
                    <span> {total} items</span>
                </div>
                <div>Subtotal: 
                    <span> ${totalprice}</span>
                </div>
                <div>Shipping:
                    <span> $0</span>
                </div>
                <div>Total cost: 
                    <span> ${totalprice}</span>
                </div>
                <button type='submit' data-testid='buy' class="buy__btn-w-150">
                    Place an order
                </button>
              </div>
            </div>
          </form>
        </>
      );
}

export default Checkout;