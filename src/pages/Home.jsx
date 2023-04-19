import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import {fetchCoffees} from '../redux/slices/medicineSlice';
import Spinner from '../components/Spinner/Spinner';
import Beans from '../components/UI/Beans';
import ProductList from '../components/UI/ProductList'

import logo from '../assets/icons/logo1.svg';

import '../styles/home.scss';

const Home = () => {
    const coffeesItems = useSelector(state => state.coffees.coffees);
    console.log(coffeesItems);
    const coffeesLoadingStatus = useSelector(state => state.coffees.coffeesLoadingStatus);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCoffees());
    }, []);

    // if (coffeesLoadingStatus === "loading") {
    //     return <Spinner/>;
    // } else if (coffeesLoadingStatus === "error") {
    //     return <h5 className="text-center mt-5">Помилка загрузки</h5>
    // }

    const renderCoffeesList = (arr) => {
        if (arr.length === 0) {
            return (
                    <h5 className="text-center mt-5">Товару поки немає</h5>
            )
        }

        const limitedArr = arr.slice(0, 3);
        
        return limitedArr.map(({id, ...props}) => {
            return (
                    <ProductList {...props} id={id}/>
            )
        })
    }

    const elements = renderCoffeesList(coffeesItems);
    console.log(window.localStorage);
    return (
        <>
        <section className="main">
            <div className="main__block">
                <h1 className="main__title">
                    Everything About Pharmacy
                </h1>
                <div className="main__coffee-beans">
                    <hr class='main__hr'/>
                        <img src={logo} alt="beans" class="logo-top-img" />
                    <hr class='main__hr'/>
                </div>
                <h2 className="main__subtitle">
                    Your health, our priority: <br /> Shop for wellness at our online pharmacy.
                </h2>
                <div className="main__btn">
                    <Link className='main__btn-link' to='/shop'>More</Link>
                </div>
            </div>
        </section>

        <section className="about">
            <h2 className="title">About Us</h2>
            <Beans/>
            <div className="about__subtitle">
            An online pharmacy service is a digital platform that provides customers with a range of healthcare-related services, including the ability to purchase prescription medications and other healthcare products online.
            These services are typically provided by licensed pharmacists who can answer questions, provide guidance on medications, and offer advice on managing health conditions.
            Some online pharmacy services also offer virtual consultations with healthcare providers, allowing customers to receive medical advice from the comfort of their homes. 
            In addition to prescription medications, online pharmacy services may also offer over-the-counter products, such as vitamins and supplements, as well as health and wellness products, such as skincare items and home medical equipment.
            Overall, online pharmacy services provide a convenient and accessible way for customers to manage their health and wellbeing.
            </div>
        </section>

        <section className="best">
            <h2 className="title">Our best</h2>
            <div className="best__product-wrapper">
                {elements}
            </div>
        </section>
        </>
    )
}

export default Home;