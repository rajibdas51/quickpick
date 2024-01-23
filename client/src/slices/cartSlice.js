import { createSlice } from '@reduxjs/toolkit';
const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [] };

// Helper function to add decimals
const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};
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

      // Calculate items Price
      state.itemsPrice = state.cartItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
      );
      // Calculate shipping Price(if order amount is over $200 then free ,otherwise $10 shipping)
      state.shippingPrice = addDecimals(state.itemsPrice > 200 ? 0 : 10);
      // Calculate tax Price(5% tax)
      state.taxPrice = addDecimals(Number((0.05 * state.cartPrice).toFixed(2)));
      // Calculate total Price
      state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.taxPrice) +
        Number(state.shippingPrice)
      ).toFixed(2);

      localStorage.setItem('cart', JSON.stringify(state));
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
