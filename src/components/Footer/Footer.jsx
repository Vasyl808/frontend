import BlackHeader from "../UI/BlackHeader";
import Beans from "../UI/Beans";
import React from 'react';

//import "../../styles/index.scss";

const Footer = () => {
    return (
        <>
            <BlackHeader/>
            <div className="footer-bottom" data-testid="footer-bottom">
                <Beans/>
            </div>
        </>
    )
}

export default Footer