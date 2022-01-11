import React from 'react';
import PropTypes from 'prop-types';
import CartItem from './CartItem';
import { Box } from '@material-ui/core';

CartList.propTypes = {};

function CartList({ productList }) {
  return (
    <Box display="flex" flexDirection="column">
      {productList.map((cartItem, index) => (
        <CartItem product={cartItem.product} quantity={cartItem.quantity} />
      ))}
    </Box>
  );
}

export default CartList;
