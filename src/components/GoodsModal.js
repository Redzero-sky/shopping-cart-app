import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart, updateQuantity } from '../redux/cartSlice';
import goods from "../consts/goodsList";
import { Dialog, DialogBackdrop } from '@headlessui/react';
import GoodsDetailSlider from './GoodsDetailSlider'; // Import the slider

const GoodsModal = ({ isOpen, onClose, id }) => {
    const dispatch = useDispatch();
    const item = goods.find((i) => i.id === parseInt(id));
    const [qty, setQty] = useState(1);

    useEffect(() => {
        setQty(1);
    }, [id]);

    if (!item) {
        return null; // Close modal if item is not found
    }
    const handleQuantityChange = (id, quantity) => {
        setQty(quantity);
    };

    const addCart = (item) => {
        dispatch(addToCart(item));
        dispatch(updateQuantity({ id: item.id, quantity: parseInt(qty) }));
    }
    return (
        <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center">
            <DialogBackdrop onClick={onClose} className="fixed inset-0 bg-black/60" />
            <div className="bg-white rounded-lg shadow-lg max-w-4xl mx-auto p-6 z-50">
                <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="md:w-1/2">
                        <GoodsDetailSlider images={item.image} />
                    </div>
                    <div className="md:w-1/2">
                        <Dialog.Title className="text-3xl font-bold mb-2">{item.name}</Dialog.Title>
                        <p className="text-gray-600 mb-4 text-2xl">${item.price}</p>
                        <p className="text-gray-700 mb-4" dangerouslySetInnerHTML={{ __html: item.detail }} />
                        <div className="mt-10 flex items-center">
                            <p className={"mb-0"}>Qty: </p>
                            <input
                                type="number"
                                min="1"
                                value={qty}
                                onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                className="ml-2 border border-gray-300 rounded p-1 w-12 text-center"
                            />
                            <button onClick={() => { addCart(item) }}
                                className=" mx-4 bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600 transition duration-200">
                                Add to Cart
                            </button>
                        </div>

                    </div>
                </div>
                <div className="flex justify-end mt-6">
                    <button onClick={onClose} className="bg-blue-500 text-white py-2 px-4 rounded">
                        Close
                    </button>
                </div>
            </div>
        </Dialog>
    );
};

export default GoodsModal;
