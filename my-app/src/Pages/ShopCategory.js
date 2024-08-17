import React, { useContext } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Components/Assets/Frontend_Assets/dropdown_icon.png';

import Items from '../Components/Items/Items';
import all_product from '../Components/Assets/Frontend_Assets/all_product';


const ShopCategory = (props) => {
    const { all_products } = useContext(ShopContext);
    return (
        <div className='shop-category'>
            <img className="shopcategory-banner" src={props.banner} alt="Banner" />
            <div className='shopcategory-indexSort'>
                <p>
                    <span> Show 1-12</span> out of 36 products
                </p>
            </div>

            <div className='shopcategory-sort'>
                Sort by <img src={dropdown_icon} alt="Sort" />
            </div>

             <div className='shopcategory-products'>
                {all_product.map((item, i) => {
                    if (props.category === item.category) {
                        return (
                            <Items
                            key={i}
                            id={item.id}
                            name={item.name}
                            image={item.image}
                            new_price={item.new_price}
                            old_price={item.old_price}
                            />
                        );
                    } else {
                        return null;
                    }
                })}
            </div>


            <div className='shopcategory-loadmore'>
                Explore More
            </div>





            
        </div>
    );
}

export default ShopCategory;
