import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  makeStyles,
  OutlinedInput,
  Paper,
} from '@material-ui/core';
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from '../../../constants';
import { formatPrice } from '../../../utils';
import AddCartQuantity from '../../../components/form-controls/QuantityField';
import { AddCircleOutline, RemoveCircleOutline } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { removeFromCart, setQuantity } from '../CartSlice';
import { red } from '@mui/material/colors';

CartItem.propTypes = {};

const useStyles = makeStyles((theme) => ({
  image: {
    width: '100px',
    marginLeft: '10px',
  },
  input: {
    maxWidth: '60px',
  },
  remove: {
    backgroundColor: red[500],
  },
}));

function CartItem({ product, quantity }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const thumbnail = product.thumbnail
    ? `${STATIC_HOST}${[product.thumbnail?.url]}`
    : THUMBNAIL_PLACEHOLDER;

  const [value, setValue] = useState(quantity);

  function handleSetRemoveQuantity() {
    dispatch(
      setQuantity({
        id: product.id,
        quantity: quantity - 1,
      })
    );
    setValue(value - 1);
  }

  function handleSetAddQuantity() {
    dispatch(
      setQuantity({
        id: product.id,
        quantity: quantity + 1,
      })
    );
    setValue(value + 1);
  }

  function handleRemoveProduct() {
    dispatch(removeFromCart(product.id));
  }

  return (
    <Grid container spacing={4} direction="row" alignItems="center">
      <Grid item className={classes.image}>
        <img src={thumbnail} alt={product.name} width="100%" />
      </Grid>
      <Grid item>{product.name}</Grid>
      <Grid item>{formatPrice(product.salePrice)}</Grid>
      <Grid item>{quantity}</Grid>
      <Grid item>{formatPrice(product.salePrice * quantity)}</Grid>
      <Grid item>
        <Box>
          <IconButton onClick={handleSetRemoveQuantity}>
            <RemoveCircleOutline />
          </IconButton>
          <OutlinedInput type="number" value={value} className={classes.input} />
          <IconButton onClick={handleSetAddQuantity}>
            <AddCircleOutline />
          </IconButton>
        </Box>
      </Grid>
      <Grid item>
        <Button variant="outlined" color="success" onClick={handleRemoveProduct}>
          Remove
        </Button>
      </Grid>
    </Grid>
  );
}

export default CartItem;
