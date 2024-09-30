import React from 'react';
import {Dialog, DialogBackdrop} from '@headlessui/react';
import {useSelector, useDispatch} from 'react-redux';
import {removeFromCart, updateQuantity} from '../redux/cartSlice';

const CartModal = ({isOpen, onClose}) => {
    const cartItems = useSelector((state) => state.cart.cartItems);

    const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const dispatch = useDispatch();

    const handleRemove = (id) => {
        dispatch(removeFromCart(id));
    };

    const handleQuantityChange = (id, quantity) => {
        dispatch(updateQuantity({id, quantity: parseInt(quantity)}));
    };

    return (
        <Dialog open={isOpen} onClose={onClose} className="fixed z-10 inset-0 overflow-y-auto">
            <DialogBackdrop onClick={onClose} className="fixed inset-0 bg-black/60"/>
            <div className="flex items-center justify-center min-h-screen px-4">
                <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-md w-full p-6">
                    <Dialog.Title className="text-2xl font-bold">Your Cart</Dialog.Title>
                    {cartItems.length === 0 ? (
                        <div className="mt-4">
                            <p>Your cart is empty.</p>
                        </div>
                    ) : (
                        <div className="mt-4">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex justify-between items-center mb-4 border-b pb-2">
                                    <img src={item.image[0]} alt={item.name} className="w-16 h-16 object-cover mr-4"/>
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
                                    <button onClick={() => handleRemove(item.id)} className="bg-red-500 text-white py-1 px-3 rounded">
                                        Remove
                                    </button>
                                </div>
                            ))}

                            <div className="text-right mt-4">
                                <h3 className="text-xl font-semibold">Total: ${totalAmount.toFixed(2)}</h3>
                            </div>
                        </div>
                    )}
                    <div className="flex justify-end mt-6">
                        <button onClick={onClose} className="bg-blue-500 text-white py-2 px-4 rounded">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

export default CartModal;
