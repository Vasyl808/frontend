import { Routes, Route, Navigate } from 'react-router-dom';

import Home from '../pages/Home';
import OurProduct from '../pages/OurProduct';
import About from '../pages/About';
import MedicineItem from '../pages/MedicineItem';
import ShopingCard from '../pages/ShopingCard';
import Checkout from '../pages/Checkout';
import Login from '../pages/Login';
import User from '../pages/User';
import Signup from '../pages/Signup';
import UpdateUser from '../pages/UpdateUser';
import Admin from '../pages/Admin';
import Add from '../pages/Add';
import Update from '../pages/Update'
import UpdateItem from '../pages/UpdateItem'
import ShoppingList from '../pages/ShoppingList'
import Order from '../pages/Order'
import UserOrderList from '../pages/UserOrderList'
import Category from '../pages/Category'

const Routers = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigate to='home'/>}/>
                <Route path='home' element={<Home/>}/>
                <Route path='shop' element={<OurProduct/>}/>
                <Route path='shop/:id' element={<MedicineItem/>}/>
                <Route path='about' element={<About/>}/>
                <Route path='shoping-card' element={<ShopingCard/>}/>
                <Route path='checkout' element={<Checkout/>}/>
                <Route path='login' element={<Login/>}/>
                <Route path='user/:id' element={<User/>}/>
                <Route path='sign-up' element={<Signup/>}/>
                <Route path='update-user/:id' element={<UpdateUser/>}/>
                <Route path='admin' element={<Admin/>}/>
                <Route path='add' element={<Add/>}/>
                <Route path='update' element={<Update/>}/>
                <Route path='update-item/:id' element={<UpdateItem/>}/>
                <Route path='shopping-list' element={<ShoppingList/>}/>
                <Route path='order/:id' element={<Order/>}/>
                <Route path='user-shopping-list/:id' element={<UserOrderList/>}/>
                <Route path='category' element={<Category/>}/>
        </Routes>
    )
}   

export default Routers;