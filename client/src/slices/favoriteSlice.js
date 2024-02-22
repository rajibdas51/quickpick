// favoritesSlice.js

import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: [],
  reducers: {
    addToFavorites: (state, action) => {
      const existingProduct = state.find(
        (product) => product._id === action.payload._id
      );
      if (!existingProduct) {
        state.push(action.payload);
      }
    },
    // Add a remove from favorites action if needed
    // removeFromFavorites: (state, action) => {
    //   state = state.filter((product) => product._id !== action.payload._id);
    // },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
