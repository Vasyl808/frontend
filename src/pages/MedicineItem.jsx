import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {fetchCoffees} from '../redux/slices/medicineSlice';
import {addItem} from '../redux/slices/medicineSlice';
import { toast } from 'react-toastify';
import error_handler from '../utils/utils'
import Spinner from '../components/Spinner/Spinner';

import CommonSection from "../components/UI/CommonSection";
import Beans from "../components/UI/Beans";

import item from '../assets/image/items-img/hilka.jpg'

//import '../styles/coffee-item.scss';

const MedicineItem = () => {

    const {id} = useParams();
    const dispatch = useDispatch();
    const [categoryData, setCategoryData] = useState(null);
    const coffeesLoadingStatus = useSelector(state => state.coffees.coffeesLoadingStatus);

    useEffect(() => {
            dispatch(fetchCoffees());
            //window.localStorage.setItem('totalQuantity', 0);
    }, []);

    const coffeesItems = useSelector(state => state.coffees.coffees);

    const coffeesItem = coffeesItems.find(item => item.id == id);

    if (coffeesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (coffeesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Помилка загрузки</h5>
    }

    if (!coffeesItem) {
        return 'Загрузка...'
    }
    console.log(coffeesItem)

    const {medicine_status, name, price, quantity, medicine_description, manufacturer, demand, image_url, demand_count} = coffeesItem
    

    const addToCard = () => {
        const quntity11 = document.getElementById("quantity");
        dispatch(addItem({
            id: Number(id),
            productName: name,
            price: price,
            imgUrl: image_url,
            quntity_itm: Number(quntity11.value),
            count_quantity: quantity
        }));
    };

    function addToDemand(){
        let numbers = JSON.parse(window.localStorage.getItem('like'))
        if (window.localStorage.getItem('like') === null || numbers.includes(Number(id)) === false){
            const token = window.localStorage.getItem('token')
            const id_user = window.localStorage.getItem('id_user')
            const headers = new Headers();
            headers.set('Authorization', 'Basic ' + token);
            headers.set('content-type', 'application/json');
            fetch('http://127.0.0.1:5000/api/v1/medicine/demand/' + Number(id), {
                method: 'PUT', 
                headers,
            })
            .then(async response => {
                if (!response.ok) {
                    const error = await response.text();
                    error_handler(error);
                    throw new Error(error);
                    toast.error("Item available");
                }
                else{
                    if (window.localStorage.getItem('like') === null){
                        window.localStorage.setItem('like', JSON.stringify([Number(id)]))
                    }
                    else{
                        numbers.push(Number(id));
                        window.localStorage.setItem('like', JSON.stringify(numbers))
                    }
                    toast.success("Item demand");
                window.location.reload();}
            })
            .catch(error => {
                error_handler(error);
                console.error(error);
            })
        }
        else{
            toast.error("You already liked this product", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 10000 // в мілісекундах
            });
        }
    }


    return (
        <>
            <CommonSection title={name}/>
        
            <section className="coffee">
                <img src={coffeesItem.image_url} alt="coffee" className="coffee__img" />
                
                <div className="coffee__descr">
                    <h2 className="title-pt-0">{name}</h2>
                    <div class="coffee__country">
                    <div class="coffee__country-title">
                        Category:
                    </div>
                    <div class="coffee__country-name">
                        {coffeesItem.category}
                    </div>
                </div>
                <div class="coffee__description">
                    <div class="coffee__description-value">
                        <b>Category description: </b>{coffeesItem['category description']}
                    </div>
                    </div>
                    <div className="coffee__country">
                        <div className="coffee__country-title">
                            Medicine status:
                        </div>
                        <div className="coffee__country-name">
                            {medicine_status.charAt(0).toUpperCase() + medicine_status.slice(1)}
                        </div>
                    </div>
                    <div className="coffee__description">
                        <div className="coffee__description-value">
                        <b>Description: </b>{medicine_description}
                        </div>
                    </div>
                    <div className="coffee__description">
                        <div className="coffee__description-value">
                        <b>Manufacturer: </b>{manufacturer}
                        </div>
                    </div>
                    <div className="coffee__description">
                        <div className="coffee__description-value">
                        <b>Is on demand?: </b>{demand ? 'Yes' : 'No'}
                        </div>
                    </div>
                    {demand ? (<div className="coffee__description">
                        <div className="coffee__description-value">
                        <b>Demand count: </b> {demand_count}
                        </div>
                    </div>): (<div></div>)}
                    <div className="coffee__description">
                        <div className="coffee__description-value">
                        <b>Quantity: </b>{quantity}
                        </div>
                    </div>
                        <div class="coffee__price">
                    <div class="coffee__price-title">
                            Count:
                        </div>
                        <div class="coffee__price-value">
                            <input type="number" class="count-field" min="1" max={Number(quantity)} id="quantity" defaultValue={1}></input>
                        </div>
                    </div>
                    <div className="coffee__price">
                        <div className="coffee__price-title">
                            Price:
                        </div>
                        <div className="coffee__price-value">
                            {price}$
                        </div>

                        <button className='buy__btn' data-testid='add_to_card_btn' onClick={addToCard}>Add to card</button>
                    </div>
                    <div class="coffee__price">
                    <div class="coffee__price-title">
                        Not available?:
                    </div>
                    <button class='demand__btn' data-testid='add_to_demand_btn' onClick={addToDemand}>Add to demand</button> 
                </div>
                </div>
            </section>
        </>
    )
}

export default MedicineItem;