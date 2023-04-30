import { Link } from 'react-router-dom';
import {MdAddShoppingCart} from 'react-icons/md';
import {addItem} from '../../redux/slices/medicineSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import React from 'react';
//import '../../styles/product-list.scss';

import image from '../../assets/image/items-img/hilka.jpg';

const ProductList = ({id, name, medicine_status, price, quantity, image_url}) => {

    const addToCard = () => {
        dispatch(addItem({
            id: id,
            productName: name,
            price: price,
            medicine_status, medicine_status,
            imgUrl: image_url,
            quntity_itm: Number(1),
            count_quantity: quantity
        }));

        //toast.success('Product added successfully');
    };

    const dispatch = useDispatch();

    return (
        <>
            <div className="product__block">
                <Link to={`/shop/${id}`}>
                    <img src={image_url} alt="" className='product__img' />
                </Link>
                <Link to={`/shop/${id}`} className='product__link'>
                    <div className="product__title">
                        {name}
                    </div>
                </Link>
                <div className="product__country">
                    {medicine_status.charAt(0).toUpperCase() + medicine_status.slice(1)}
                </div>
                <div className="product__price">
                    <motion.div whileTap={{scale: 1.2}} className='product__add'>
                        <MdAddShoppingCart onClick={addToCard}  className='product__add-item'/>
                    </motion.div>
                    {`${price}$`}
                </div>
            </div>
        </>
    )
}

export default ProductList;