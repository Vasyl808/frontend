import { useSelector } from "react-redux";
import { Formik, Form, useField, Field } from 'formik';
import * as Yup from "yup";
import { toast } from 'react-toastify';
import React, { useState, useEffect } from 'react';

import '../styles/checkout.scss';

const Checkout = () => {

    const [userData, setUserData] = useState({});
    const [total, setTotal] = useState({});


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
          setUserData(data.user);
        });
        loadTotal();
        const button = document.getElementById("buy")
        button.addEventListener('click', start);
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
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
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
            toast.success("Покупка пройшла успішно");
            window.location.href = '/home';
          })
          .catch((error) => {
            console.error('There was a problem with the network request:', error);
          });
      })
      .catch((error) => {
        console.error('There was a problem with the network request:', error);
      });
  };

  const loadTotal = () => {
    const cartData = JSON.parse(window.localStorage.getItem("cartItems"));
    console.log(cartData === null);
    if (cartData === null){
        let total_count = 0;
        let total_price = 0;
        var checkoutWrapper = document.querySelector(".checkout__wrapper");
        var html = '<div>Total Qty: <span>' + total_count + ' items</span></div>' +
           '<div>Subtotal: <span>' + '$' + total_price + '</span></div>' +
           '<div>Shipping: <span>' +  '$' + 0 + '</span></div>' +
           '<div>Total cost: <span>' + '$' + total_price + '</span></div>' +
           '<button class="buy__btn-w-150" type="button" id="buy" onClick={start}>Place an order</button>';
        checkoutWrapper.innerHTML = html;
    }
    else{
        let total_count = 0;
        let total_price = 0;
        cartData.forEach(item => {
            total_count += Number(item.quantity);
            total_price += Number(item.price);
        })
        var checkoutWrapper = document.querySelector(".checkout__wrapper");
        var html = '<div>Total Qty: <span>' + Number(total_count) + ' items</span></div>' +
            '<div>Subtotal: <span>' + '$' + Number(total_price) + '</span></div>' +
            '<div>Shipping: <span>' + '$' + 0 + '</span></div>' +
            '<div>Total cost: <span>' + '$' + Number(total_price) + '</span></div>' +
            '<button class="buy__btn-w-150" type="button" id="buy" onClick={start}>Place an order</button>';
        checkoutWrapper.innerHTML = html;
    }
  }
    return (
        <>
          <section className="bgc">
            <h2 className="bgc__title">Checkout</h2>
          </section>
          <form className="form">
            <div className="input__wrapper">
              <input
                placeholder="Enter your name"
                id="name"
                name="name"
                type="text"
                defaultValue={userData.first_name}
              />
              <input
                placeholder="Enter your email"
                id="email"
                name="email"
                type="email"
                defaultValue={userData.email}
              />
              <input
                placeholder="Phone number"
                id="number"
                name="number"
                type="text"
                defaultValue={userData.phone_number}
              />
              <input
                placeholder="Street address"
                id="street"
                name="street"
                type="text"
              />
              <input placeholder="City" id="city" name="city" type="text" />
              <input
                placeholder="Postal code"
                id="code"
                name="code"
                type="number"
              />
              <input
                placeholder="Country"
                id="country"
                name="country"
                type="text"
              />
            </div>
    
            <div className="checkout">
              <div className="checkout__wrapper">
                
              </div>
            </div>
          </form>
        </>
      );
}

export default Checkout;