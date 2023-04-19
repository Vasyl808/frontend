import Beans from './Beans';

import '../../styles/about-goods.scss';

const AboutGoods = () => {
  return (
    <>
        <div className="about-goods__descr">
            <h2 className="title-pt-0">About our pharmacy</h2>
            <Beans/>
            <div className="about-goods__subtitle">
            An online pharmacy is a digital platform that allows customers to purchase prescription medications and other healthcare products from the comfort of their homes. 
                Online pharmacies offer a convenient and discreet way for people to access medications and other healthcare products without having to physically visit a brick-and-mortar pharmacy. 
            </div>
        </div>
    </>
  )
}

export default AboutGoods;