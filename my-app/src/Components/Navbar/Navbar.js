import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './Navbar.css';
import logo from '../Assets/Frontend_Assets/logo.png';
import cart_icon from '../Assets/Frontend_Assets/cart_icon.png'; 


const Navbar = () => {

    const [menu, setMenu] = useState("shop"); 

    return (
        <div className = "navbar">
            <div className="nav-logo">
                <img src={logo} alt=""></img>
                <p> Shopper </p>
            </div>

            
            <ul className='nav-menu'>
                <li onClick={() => setMenu('shop')}> <Link style={{textDecoration: 'none'}} to='/'> Shop </Link> {menu === "shop" ? <hr /> : <></>} </li>
                <li onClick={() => setMenu('mens')}>  <Link style={{ textDecoration: 'none' }}  to='/mens'> Mens </Link>   {menu === "mens" ? <hr /> : <></>} </li>
                <li onClick={() => setMenu('womens')}> <Link style={{ textDecoration: 'none' }}  to='/womens'> Womens </Link>  {menu === "womens" ? <hr /> : <></>} </li>
                <li onClick={() => setMenu('kids')}>  <Link style={{ textDecoration: 'none' }} to='/kids'> Kids </Link>  {menu === "kids" ? <hr /> : <></>} </li>
            </ul>

            <div className='login-cart'>
                <Link to='/login-signup'>  <button>Login</button> </Link>

                <Link to='/cart'> <img src={cart_icon} alt=""/></Link>
                <div className = "nav-cart-count"> 0 </div>
            </div>



            
            
        </div>
    )
}

export default Navbar; 
