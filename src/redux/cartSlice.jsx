import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify'; // Import toast

const initialState = {
    cartItems: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = state.cartItems.find((i) => i.id === action.payload.id);
            if (item) {
                item.quantity += 1;
            } else {
                state.cartItems.push({ ...action.payload, quantity: 1 });
            }
            toast.success(`${action.payload.name} added to cart!`); // Show toast
        },
        removeFromCart: (state, action) => {
            let removedItem = state.cartItems.filter((i) => i.id === action.payload);
            state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);
            let removedName = removedItem[0].name;
            toast.error(`${removedName} removed from cart!`); // Show toast
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.cartItems.find((i) => i.id === id);
            if (item && quantity > 0) {
                item.quantity = quantity;
            }
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
