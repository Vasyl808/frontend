import { useSelector, useDispatch } from "react-redux";
import {deleteItem, count_add, count_minus} from '../redux/slices/medicineSlice';
import { motion } from 'framer-motion';
import {FaTrashAlt} from 'react-icons/fa';
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import {fetchCoffees} from '../redux/slices/medicineSlice';

import CommonSection from "../components/UI/CommonSection";

import '../styles/shoping-card.scss';

const UserIcon = () => (
    <Link to='/checkout'>Checkout</Link>
  );
  
  const LoggedInIcon = () => (
    <Link to='/login'>Checkout</Link>
  );


const ShopingCard = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCoffees());
        setIsLoggedIn(localStorage.getItem("token") !== null);
    }, []);
    const totalAmount = useSelector(state => state.coffees.totalAmount);
    const items = useSelector(state => state.coffees.cartItems);
    
    return (
        <>
        <CommonSection title='Shoping Card'/>
        <div className="card">

            {
                items.length === 0 ? (<h2 className='fs-4 text-center'>No item added to the cart</h2>) : (

                    <table  className='table bordered'>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Price</th>
                                <th>Qty</th>
                                <th>Add</th>
                                <th>Minus</th>
                                <th>Delete</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                items.map((item, index) => (
                                    <Tr item={item} key={index}/>
                                ))
                            }
                        </tbody>
                    </table>
                )
            }

            <div className="card__wrapper">
                <div className="card__subtotal">
                    <div className="card__subtotal-title">
                        Subtotal
                    </div>
                    <div className="card__subtotal-price">
                        ${totalAmount.toFixed(2)}
                    </div>
                </div>
                <div className="card__subtitle">
                    taxes and shipping will calculate in checkout
                </div>
                <button className="buy__btn-w-300">
                    {isLoggedIn ? <UserIcon /> : <LoggedInIcon />}
                </button>
                <button className="buy__btn-w-300">
                    <Link to='/shop'>Continue Shoping</Link>
                </button>
            </div>
        </div>
        
        </>
    )
}

const Tr = ({item}) => {
    
    const dispatch = useDispatch();
    const deleteProduct = () => {
        dispatch(deleteItem(item.id));
    }
    
    const count_add_f = () =>{
        //console.log(coffeesItems);
        //const foundCoffee = coffeesItems.find(coffee => coffee.id === item.id);
        //console.log(foundCoffee);
        //console.log(foundCoffee.quantity);
        dispatch(count_add(item.id));
    }

    const count_minus_f = () =>{
        dispatch(count_minus(item.id));
    }

    function count_add_q(medicine_id){
        let cartItems = JSON.parse(window.localStorage.getItem("cartItems")); 
        //console.log(cartItems)
        let cartItem = cartItems.find(item => item.id == Number(medicine_id));
        if (cartItem) {
          cartItem.quantity = Number(cartItem.quantity) + 1;
        }

        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        localStorage.setItem('totalAmount', Number(localStorage.getItem('totalAmount')) + cartItem.price);
        localStorage.setItem('totalQuantity', Number(localStorage.getItem('totalQuantity')) + 1);
        window.location.reload()
    }
    
    function count_minus_q(medicine_id){
        let cartItems = JSON.parse(window.localStorage.getItem("cartItems")); 
        //console.log(cartItems)
        let cartItem = cartItems.find(item => item.id == Number(medicine_id));
        //console.log(cartItem);
        if (cartItem) {
          cartItem.quantity = Number(cartItem.quantity) - 1;
          //console.log(cartItem.quantity === 0)
          if(cartItem.quantity === 0){
            let cartItems = JSON.parse(window.localStorage.getItem("cartItems")); 
            const index = cartItems.findIndex(item => item.id == medicine_id);
            if (index !== -1) {
              cartItems.splice(index, 1);
            }
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            localStorage.setItem('totalAmount', Number(localStorage.getItem('totalAmount')) - cartItem.price);
            localStorage.setItem('totalQuantity', Number(localStorage.getItem('totalQuantity')) - 1);
            window.location.reload()
          }
          else{
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            localStorage.setItem('totalAmount', Number(localStorage.getItem('totalAmount')) - cartItem.price);
            localStorage.setItem('totalQuantity', Number(localStorage.getItem('totalQuantity')) - 1);
            window.location.reload()
        }
        }
    }

    return (
        <tr>
            <td>
                <img src={item.imgUrl} alt="" />
            </td>
            <td><Link to={`/shop/${item.id}`}>{item.productName}</Link></td>
            <td>${item.price}</td>
            <td>{item.quantity}px</td>
            <td>
                <div class="fa-solid" onClick={count_add_f}> + </div>
            </td>
            <td>
                <div class="fa-solid" onClick={count_minus_f}> &#8722; </div>
            </td>
            <td>
                <motion.div whileTap={{scale: 1.3}}>
                    <FaTrashAlt onClick={deleteProduct} className="trash"/>
                </motion.div>
            </td>
        </tr>
    )
}

export default ShopingCard;