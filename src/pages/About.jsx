import AboutGoods from '../components/UI/AboutGoods';
import Product from '../components/UI/Product';
import React from 'react';
//import '../styles/about.scss';

import cup from '../assets/image/img/cup.png';

const About = () => {
    return (
        <>
            <section className='bgc'>
                    <h2 className='bgc__title'>For your pleasure</h2>
            </section>

            <section className="goods">
                <img src={cup} alt="cup of coffee" className='goods__img'/>
                <AboutGoods/>
            </section>

            <hr className='hr-big'/>
            <div data-testid="product"><Product/></div>
            
        </>
    )
}

export default About;