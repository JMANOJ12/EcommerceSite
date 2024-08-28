import React, { useContext } from 'react'; 
import './CartItems.css'; 

import { ShopContext } from '../../Context/ShopContext'; 
import remove_icon from '../Assets/Frontend_Assets/cart_cross_icon.png'; 



const CartItems = () => {


    const { getTotalAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext); 

    return (
        <div className='cartitems'>
            <div className='cartitems-format-main'>
                <p> Products </p>
                <p> Title </p>
                <p> Price </p>
                <p> Quantity </p>
                <p> Total </p>
                <p> Remove </p>

            </div>
            <hr />


            {all_product.map((e) => {
                if (cartItems[e.id] > 0) {
                    return (  // Add return here
                        <div key={e.id} className=''>
                            <div className='cartitems-format cartitems-format-main'>
                                <img src={e.image} alt='' className='carticon-product-icon' />
                                <p>{e.name} </p>
                                <p> ${e.new_price}</p>
                                <button className='cartitems-quantity'> {cartItems[e.id]} </button>
                                <p> ${e.new_price * cartItems[e.id]}</p>
                                <img
                                    className='cartitems-remove-icon'  // Corrected duplicate className property
                                    src={remove_icon}
                                    onClick={() => { removeFromCart(e.id) }}
                                    alt='Remove item'  // It's good practice to provide a meaningful alt attribute
                                />

                            </div>
                            <hr/>
                        </div>
                    );
                }
                return null;  // Return null if the item is not in the cart to avoid errors
            })}

            <div className='cartitems-down'>
                <div className='cartitems-total'>
                    <h1> Cart Total </h1>
                </div>
                <div>
                    <div className='cartitems-total-item'>
                        <p> Subtotal </p>
                        <p> ${getTotalAmount()}</p>
                        <hr />

                        <div className='cartitems-total-item'>
                            <p> Shipping Fee </p>
                            <p> Free </p>

                        </div>
                        <hr /> 

                        <div className='cartitems-total-item'>
                            <h3> Total </h3>
                            <h3> ${getTotalAmount()}</h3>
                        </div>
                        <button> Proceed To Checkout </button>
                        <div className='cartitems-promocode'>
                            <p> If you have promo code, Enter it here: </p>
                            <div className='cartitems-promobox'>
                                <input type='text' placeholder='promo code'></input>
                                <button> Submit </button>
                            </div>
                        </div>


                    </div>
                </div>
            </div>

            


            


        </div>
    )
}

export default CartItems; 