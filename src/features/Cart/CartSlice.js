import React from 'react';
import PropTypes from 'prop-types';
import { createSlice } from '@reduxjs/toolkit';

const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    showMiniCart: false,
    cartItems: [],
  },
  reducers: {
    showMiniCart(state, action) {
      state.showMiniCart = true;
    },
    hideMiniCart(state, action) {
      state.showMiniCart = false;
    },

    addToCart(state, action) {
      const newItem = action.payload;
      const index = state.cartItems.findIndex((item) => item.id === newItem.id);
      if (index >= 0) {
        state.cartItems[index].quantity += newItem.quantity;
      } else {
        state.cartItems.push(newItem);
      }
    },
    setQuantity(state, action) {
      const index = state.cartItems.findIndex((item) => item.id === action.payload.id);
      if (index >= 0) {
        state.cartItems[index].quantity = action.payload.quantity;
      }
    },
    removeFromCart(state, action) {
      const idNeedToRemove = action.payload;
      state.cartItems = state.cartItems.filter((x) => x.id !== idNeedToRemove);
    },
  },
});

export const { showMiniCart, hideMiniCart, addToCart, setQuantity, removeFromCart } = CartSlice.actions;

export default CartSlice.reducer;
