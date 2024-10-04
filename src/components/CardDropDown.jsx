import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/cartSlice';

const CartDropDown = ({ showModal }) => {

    const cartItems = useSelector((state) => state.cart.cartItems);

    const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const dispatch = useDispatch();

    const handleRemove = (id) => {
        dispatch(removeFromCart(id));
    };

    const handleQuantityChange = (id, quantity) => {
        dispatch(updateQuantity({ id, quantity: parseInt(quantity) }));
    };

    return (
        <div className="p-4 text-black">
            <h2 className="text-lg font-bold">Cart</h2>

            {cartItems.length === 0 ? (
                <div className="mt-4">
                    <p>Your cart is empty.</p>
                </div>
            ) : (
                <div className="mt-4">
                    {cartItems.map((item, idx) => idx < 3 && (
                        <div key={item.id} className="flex justify-between items-center mb-4 border-b pb-2">
                            <img src={item.image[0]} alt={item.name} className="w-16 h-16 object-cover mr-4" />
                            <div className="flex-1">
                                <h2 className="text-lg font-medium">{item.name}</h2>
                                <p className="text-gray-600">${item.price}</p>
                                <div className="flex items-center">
                                    <p>Qty: </p>
                                    <input
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                        className="ml-2 border border-gray-300 rounded p-1 w-12 text-center"
                                    />
                                </div>
                            </div>
                            <button onClick={() => handleRemove(item.id)}
                                className="bg-red-500 text-white py-1 px-3 rounded">
                                Remove
                            </button>
                        </div>
                    ))}
                    {cartItems.length > 3 && (
                        <div className="flex justify-end mt-6">
                            <button onClick={showModal} className="bg-blue-500 text-white py-2 px-4 rounded">
                                View More
                            </button>
                        </div>
                    )}

                    <div className="text-right mt-4">
                        <h3 className="text-xl font-semibold">Total: ${totalAmount.toFixed(2)}</h3>
                    </div>
                </div>
            )}
            {/*<div className="flex justify-end mt-6">*/}
            {/*    <button onClick={onClose} className="bg-blue-500 text-white py-2 px-4 rounded">*/}
            {/*        Close*/}
            {/*    </button>*/}
            {/*</div>*/}
        </div>
        // </Dialog>
    )
        ;
};

export default CartDropDown;
