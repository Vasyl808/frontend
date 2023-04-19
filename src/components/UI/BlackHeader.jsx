import { NavLink } from "react-router-dom";


import '../../styles/blackHeader.scss';

const nav__links = [
    {
        path: '/home',
        display: 'Pharmacy'
    },
    {
        path: '/shop',
        display: 'Our products'
    },
]

const BlackHeader = () => {

    return (
        <header className='blackheader'>
            <div className="blackheader__menu">
                {
                    nav__links.map((item, index) => (
                            <li className="blackheader__nav" key={index}>
                                <div className="blackheader__links">

                                    <NavLink to={item.path} className={(navClass) => navClass.isActive ? 'blackheader__nav-active' : ''}>{item.display}</NavLink>
                                </div>
                            </li>
                        ))
                }
                
            </div>
        </header>
    )
}

export default BlackHeader;