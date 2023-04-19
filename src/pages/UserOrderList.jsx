import React, { useState, useEffect } from 'react';
import '../styles/shoping-list.scss';

function UserOrderList() {
    const [UserOrderList, setUserOrderList] = useState([]);
  
    useEffect(() => {
      const token = window.localStorage.getItem('token');
      const id_user = window.localStorage.getItem('id_user');
      const headers = new Headers();
      headers.set('Authorization', `Basic ${token}`);
      headers.set('content-type', 'application/json');
      fetch('http://127.0.0.1:5000/api/v1/pharmacy/orders/' + id_user, 
      {
          method: 'GET',
          headers,
      }
      )
        .then(response => response.json())
        .then(data => setUserOrderList(data.Orders)
        )
        .catch(error => console.error(error));
    }, []);
    
    return (
      <>
      <section className="common__section">
        <div className="text-center">
          <h1>Shopping List</h1>
        </div>
      </section>
      <div className="list">{
        UserOrderList.length === 0 ? (<h2 className='fs-4 text-center'>No item</h2>) : (
          <div className="list__wrapper">
          {UserOrderList.map((order, index) => (
            <div key={index} className="list__block">
                <button>
                    <a href={`order/${order.id}`}>Check order №{order.id}</a>
                </button>
            </div>
          ))}
        </div>
        )
      }
        
      </div>
      </>
      
    );
  }
  
  export default UserOrderList;