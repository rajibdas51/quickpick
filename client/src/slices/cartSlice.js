import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils';
const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [] };

// Helper function to add decimals

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const foundItem = state.cartItems.find((p) => p._id === item._id);
      if (foundItem) {
        state.cartItems = state.cartItems.map((p) =>
          p._id === foundItem._id ? item : p
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      return updateCart(state);
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
