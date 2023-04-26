import '../styles/order.scss';
import React, { useState, useEffect } from 'react';
import { useCallback } from 'react';
import item_img from '../assets/image/items-img/hilka.jpg'
import error_handler from '../utils/utils';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const Order = () => {
  const [orderData, setOrderData] = useState(null);
  const orderId = window.location.pathname.split('/')[2];
  const [editMode, setEditMode] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Обробник події натискання на кнопку "Редагувати"
  const handleEditClick = () => {
    setEditMode(true);
  };

  useEffect(() => {
    setIsAdmin(localStorage.getItem('userstatus') === "pharmacist");
    const token = window.localStorage.getItem('token');
    const headers = new Headers();
    headers.set('Authorization', `Basic ${token}`);
    headers.set('content-type', 'application/json');

    fetch(`http://127.0.0.1:5000/api/v1/pharmacy/order/${orderId}`, {
      method: 'GET',
      headers,
    })
      .then(response => response.json())
      .then(data => setOrderData(data.Order))
      .catch(error => console.error(error));
  }, []);
  
  function deleteOrder(){
    const token = window.localStorage.getItem('token')
    const orderId = window.location.pathname.split('/')[2];
    const headers = new Headers();
    headers.set('Authorization', 'Basic ' + token);
    headers.set('content-type', 'application/json');
    return fetch('http://127.0.0.1:5000/api/v1/pharmacy/order/' + orderId, {
        method: 'DELETE',
        headers,
    });
  }

  async function delete_order(event){
    event.preventDefault();
    deleteOrder()
        .then(async (response) => {
        if (!response.ok) {
            //alert(response)
            throw new Error(await response.text());
        }
            return response.text();
        })
        .then(() => {
            window.location.href = '/home';
        })
        .catch((error) => {
            error_handler(error)
            console.log(`Fetch error: ${error}`);
        });
  }

  const handleClick = useCallback((medicine_id) => {
    const token = window.localStorage.getItem('token')
    const orderId = window.location.pathname.split('/')[2];
    const headers = new Headers();
    headers.set('Authorization', 'Basic ' + token);
    headers.set('content-type', 'application/json');
    fetch('http://127.0.0.1:5000/api/v1/pharmacy/order/' + orderId +'/' + medicine_id, {
        method: 'DELETE',
        headers,
    })
    .then(async (response) => {
      if (!response.ok) {
          //alert(response)
          throw new Error(await response.text());
      }
          return response.text();
      })
      .then(() => {
          window.location.reload();
      })
      .catch((error) => {
          error_handler(error)
          console.log(`Fetch error: ${error}`);
      });
  }, [])

  function updateOrder(body){
    const token = window.localStorage.getItem('token')
    const orderId = window.location.pathname.split('/')[2];
    const headers = new Headers();
    headers.set('Authorization', 'Basic ' + token);
    headers.set('content-type', 'application/json');
    return fetch('http://127.0.0.1:5000/api/v1/pharmacy/order/' + orderId, {
        method: 'PUT',
        headers,
        body: JSON.stringify(body)
    });
  }

  function reject(){
    setEditMode(false);
  }

  async function confirm(event){
    event.preventDefault();
    setEditMode(false);
    const order_status = document.getElementById('order_status')
    const address = document.getElementById('address')
    const complete = document.getElementById('complete')
    const date = document.getElementById('date')
    const date1 = new Date(date.value);
    const formattedValue = format(date1, 'yyyy-MM-dd HH:mm:ss');
    let complete1 = false
    if (Number(complete.value) === 0){
       complete1 = false
    }
    else{
       complete1 = true
    }
    
    const body = {
      order_status:order_status.value,
      address: address.value,
      complete: complete1,
      shipData: formattedValue
    }

    updateOrder(body)
        .then(async (response) => {
        if (!response.ok) {
            //alert(response)
            throw new Error(await response.text());
        }
            return response.text();
        })
        .then(() => {
            toast.success("Success edit");
            window.location.reload();
        })
        .catch((error) => {
            error_handler(error)
            console.log(`Fetch error: ${error}`);
        });
  }

  if (orderData === null) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section className="common__section">
        <div className="text-center">
          <h1>Order №{orderId}</h1>
        </div>
      </section>

      <div className="card">
        <table className="table bordered">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {orderData[0].order_details.map(item => (
              <tr>
              <td>
              <Link to={`/shop/${item.medicine_id}`}>
                      <img src={item_img} alt="item" />
                      </Link>
              </td>
              <td>
              <Link to={`/shop/${item.medicine_id}`}>
                  {item.medicine}
              </Link>
                </td>
              <td>${item.price}</td>
              <td>{item.count}px</td>
              <td>
                  <div>
                      <i className="fa-solid fa-trash" onClick={() => handleClick(item.medicine_id)}></i>
                  </div>
              </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="orderQ">
        {editMode ? (
              <div className="orderQ__wrapper">
                <div>
              Owner: <Link to={`/user/${orderData[0].user_id}`}>Owner</Link>
            </div>
            <div>
              Phone number:<span>{orderData[0].phone}</span>
            </div>
            <div>
              Total Qty: <span>{orderData[0].total_count} items</span>
            </div>
            <div>
              Total cost: <span>${orderData[0].total}</span>
            </div>
            {isAdmin ? (<div>
              Purchase status: <span> <input type="text" id='order_status' defaultValue={orderData[0].order_status} /> </span>
            </div>) : (<div>
              Purchase status: <span> {orderData[0].order_status} </span>
            </div>
            )}
            {isAdmin ? (
            <div>
              Complete: <span> <input type="number" id='complete' min='0' max='1' defaultValue={Number(orderData[0].complete)} /></span>
            </div>):
            (<div>
              Complete: <span>{ orderData[0].complete? 'Yes' : 'No'}</span>
            </div>)}
            {isAdmin ?
            (<div>
              Ship data: <span><input type="datetime-local" id='date' defaultValue={new Date(orderData[0].shipData).toISOString().substr(0, 16)}/></span>
            </div>):(<div>
              Ship data: <span>{ orderData[0].shipData }</span>
            </div>)
            }
            <div>
              Address: <span> <input type="text" id='address' defaultValue={orderData[0].address} /></span>
            </div>
            <div>
              <button type="submit" className="buy__btn-w-150" onClick={reject}>
                Reject
              </button>
              <i className='dist'></i>
              <button type="submit" className="buy__btn-w-150" onClick={confirm}>
                Confirm
              </button>
            </div>
          </div>
            ) : (
              <div className="orderQ__wrapper">
            <div>
              Owner: <Link to={`/user/${orderData[0].user_id}`}>Owner</Link>
            </div>
            <div>
              Phone number:<span>{orderData[0].phone}</span>
            </div>
            <div>
              Total Qty: <span>{orderData[0].total_count} items</span>
            </div>
            <div>
              Total cost: <span>${orderData[0].total}</span>
            </div>
            <div>
              Order status: <span> {orderData[0].order_status}</span>
            </div>
            <div>
              Address: <span>{orderData[0].address}</span>
            </div>
            <div>
              Complete: <span>{ orderData[0].complete? 'Yes' : 'No'}</span>
            </div>
            <div>
              Ship date: <span>{orderData[0].shipData}</span>
            </div>
            <div>
              <button type="submit" className="buy__btn-w-150" onClick={handleEditClick}>
                Edit order
              </button>
              <i className='smitia'><i className="fa-solid fa-trash" onClick={delete_order}></i></i> 
              
            </div>
          </div>
            )}
          
        </div>
      </div>
    </>
  );
};

export default Order;
