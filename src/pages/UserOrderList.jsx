import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import error_handler from '../utils/utils'
//import '../styles/shoping-list.scss';

function UserOrderList() {
    const [UserOrderList, setUserOrderList] = useState([]);
    const [filter, setFilter] = useState('all')
    const {id} = useParams();
    const id_user = id;

    useEffect(() => {
      const token = window.localStorage.getItem('token');
      //const id_user = window.localStorage.getItem('id_user');
      const headers = new Headers();
      headers.set('Authorization', `Basic ${token}`);
      headers.set('content-type', 'application/json');
      fetch('http://127.0.0.1:5000/api/v1/pharmacy/orders/' + id_user, 
      {
          method: 'GET',
          headers,
      }
      )
      .then(async response => {
        if (!response.ok) {
          const error = await response.text();
          throw new Error(error);
        }
        return response.json();
      })
        .then(data => setUserOrderList(data.Orders)
        )
        .catch(error => error_handler(error));
    }, []);
    
    function filterPlaced(orders) {
      return orders.filter(order => order.order_status === 'placed');
    }
    
    function filterApproved(orders) {
      return orders.filter(order => order.order_status === 'approved');
    }
    
    function filterDelivered(orders) {
      return orders.filter(order => order.order_status === 'delivered');
    }
    
    function filterComplete(orders) {
      return orders.filter(order => order.complete === true);
    }
    
    function filterNot_complete(orders) {
      return orders.filter(order => order.complete === false);
    }
    

    function filterAll(orders) {
      return orders;
    }

  let filterFunction;
  switch(filter) {
    case 'placed':
      filterFunction = filterPlaced;
      break;
    case 'approved':
      filterFunction = filterApproved;
      break;
    case 'delivered':
      filterFunction = filterDelivered;
      break;
    case 'not complete':
      filterFunction = filterNot_complete;
      break;
    case 'complete':
      filterFunction = filterComplete;
      break;
    default:
      filterFunction = filterAll;
  }

    function filter_placed(){
      setFilter('placed');
    }

    function all(){
      setFilter('all');
    }

    function filter_approved(){
      setFilter('approved');
    }

    function filter_delivered(){
      setFilter('delivered');
    }

    function filter_not_complete(){
      setFilter('not complete');
    }

    function filter_complete(){
      setFilter('complete');
    }

    const filteredOrders = filterFunction(UserOrderList);

    return (
      <>
      <section className="common__section">
        <div className="text-center">
          <h1>Shopping List</h1>
        </div>
      </section>
      <section className="filter">
                <hr className="filter__hr" />
                <div className="filter__elem">

                    <div className="filter__country" id="myDIV">
                        <div className="filter__country-title">
                            Filter
                        </div>

                        <div className="filter__country-block-btn">
                            <button className='btn' data-testid='all_btn' onClick={all}>
                                All
                            </button>
                            <button className='btn' data-testid='placed_btn' onClick={filter_placed}>
                                Placed
                            </button>
                            <button className="btn" data-testid='approved_btn' onClick={filter_approved}>
                                Approved
                            </button>
                            <button className='btn' data-testid='delivered_btn' onClick={filter_delivered}>
                                Delivered
                            </button>
                            <button className='btn' data-testid='complete_btn' onClick={filter_complete}>
                                Complete
                            </button>
                            <button className='btn' data-testid='not_complete_btn' onClick={filter_not_complete}>
                                Not complete
                            </button>
                        </div>
                    </div>
                </div>
            </section>

      <div className="list">{
        filteredOrders.length === 0 ? (<h2 className='fs-4 text-center'>No item</h2>) : (
          <div data-testid='list_orders' className="list__wrapper">
          {filteredOrders.map((order, index) => (
            <div key={index} className="list__block">
                <button>
                    <a href={`/order/${order.id}`}>Check order №{order.id}</a>
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