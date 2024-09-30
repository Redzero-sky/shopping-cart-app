import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { Link } from 'react-router-dom';
import goods from "../consts/goodsList";
import GoodsModal from "../components/GoodsModal";

const GoodsList = () => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const handleAddToCart = (item) => {

        dispatch(addToCart(item));
    };
    const openModal = (id) => {
        setSelectedId(id);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedId(null);
        setIsModalOpen(false);
    };

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl mb-6">Goods</h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {goods.map((item) => (
                    <div key={item.id} className="border p-4 rounded-lg">
                        <Link to="#" onClick={() => openModal(item.id)} className="block mt-2 text-blue-600">
                            <img src={item.image[0]} alt={item.name} className="mb-4"/>
                            <h2 className="text-xl mb-2">
                                    {item.name}
                            </h2>
                        </Link>
                        <div className="flex justify-between items-center">
                            <p className="text-gray-600 text-xl">${item.price}</p>
                            <button
                                onClick={() => handleAddToCart(item)}
                                className="bg-blue-500 text-white py-1 px-4 rounded"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <GoodsModal isOpen={isModalOpen} onClose={closeModal} id={selectedId}/>
        </div>
    );
};

export default GoodsList;
