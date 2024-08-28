import React, { createContext, useState } from 'react';
import all_product from '../Components/Assets/Frontend_Assets/all_product';

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < all_product.length; index++) {
        cart[index] = 0;
    }
    return cart;
}


// This is a provider which would esentially provide context to the child components
const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(getDefaultCart());

    console.log(cartItems); // Corrected to match the state variable name

    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        console.log(cartItems); 
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    }


    const getTotalCartItems = () => {
        let totalItems = 0; // Corrected the variable name
        for (const item in cartItems) {
            if (cartItems[item] > 0) { // Ensure only items with a positive count are considered
                totalItems += cartItems[item]; // Sum up the quantities of all items
            }
        }

        return totalItems; // Return the total count of items
    }


    const getTotalAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item));
                totalAmount += itemInfo.new_price * cartItems[item];
            }

   
        }
        return totalAmount;
    }


    const contextValue = { getTotalCartItems, all_product, cartItems, addToCart, removeFromCart, getTotalAmount } 

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
   
}

export default ShopContextProvider;

