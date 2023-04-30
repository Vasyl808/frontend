import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';

import {filteredCoffeesByName, filteredCoffeesByCoutry, reset} from '../redux/slices/medicineSlice';

import CommonSection from "../components/UI/CommonSection";
import AboutGoods from "../components/UI/AboutGoods";
import Product from "../components/UI/Product";

import worker from '../assets/image/items-img/worker.jpg';

//import '../styles/our-products.scss';

const OurProduct = () => {


    const inputRef = useRef('');
    const dispatch = useDispatch();

    const filteredByName = () => {
		dispatch(filteredCoffeesByName(inputRef.current.value));
	};


    const filteredByCountryAvailable = () => {
        dispatch(filteredCoffeesByCoutry("available"))
    }

    const filteredByCountryPending = () => {
        dispatch(filteredCoffeesByCoutry("pending"))
    }

    const filteredByCountrySold = () => {
        dispatch(filteredCoffeesByCoutry("sold"))
    }

    const all = () => {
        dispatch(reset())
    }
        
    return (

        <>
            <CommonSection title='Our Products'/>

            <section className="about-coffee">
                <img src={worker} alt="girl" className="about-coffee__img" />
                
                <AboutGoods/>
            </section>

            <section className="filter">
                <hr className="filter__hr" />
                <div className="filter__elem">
                    <div className="filter__look">
                        <div className="filter__look-title">
                            Lookiing for
                        </div>
                        <input ref={inputRef} onChange={filteredByName} type="text" placeholder="start typing here..." className="filter__look-input" />
                    </div>

                    <div className="filter__country" id="myDIV">
                        <div className="filter__country-title">
                            Or filter
                        </div>

                        <div className="filter__country-block-btn">
                            <button className='btn' data-testid='all_btn' onClick={all}>
                                All
                            </button>
                            <button className="btn" data-testid='all_available' onClick={filteredByCountryAvailable}>
                                Available
                            </button>
                            <button className='btn' data-testid='all_pending' onClick={filteredByCountryPending}>
                                Pending
                            </button>
                            <button className='btn' data-testid='sold_btn' onClick={filteredByCountrySold}>
                                Sold
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <Product/>
        </>
        
    )
}

export default OurProduct;