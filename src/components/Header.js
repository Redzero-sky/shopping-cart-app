import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import CartModal from './CartModal';

const Header = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);

    const totalItems = cartItems.reduce((count, item) => count + 1, 0);
    const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const [isCartOpen, setIsCartOpen] = useState(false);

    const toggleCartModal = () => {
        setIsCartOpen(!isCartOpen);
    };

    return (
        <header className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl">My Shop</h1>
                <button onClick={toggleCartModal} className="relative flex items-center text-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"/>
                    </svg>
                    Cart (${totalAmount.toFixed(2)})
                    {totalItems > 0 && (
                        <span className="bg-red-600 text-white text-sm rounded-full px-2">
                            {totalItems}
                        </span>
                    )}
                </button>
            </div>

            {isCartOpen && <CartModal isOpen={isCartOpen} onClose={toggleCartModal}/>}
        </header>
    );
};

export default Header;
