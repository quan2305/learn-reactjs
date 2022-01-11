import React from 'react';
import PropTypes from 'prop-types';
import { Box, Container, makeStyles, Paper, Typography } from '@material-ui/core';
import { ContactsOutlined } from '@material-ui/icons';
import CartList from '../components/CartList';
import { useSelector } from 'react-redux';
import { cartTotalSelector } from '../selector';
import { formatPrice } from '../../../utils';

CartPage.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {
    //position: 'relative',
  },
  total: {
    display: 'flex',
    justifyContent: 'end',
    marginRight: '10px',
  },
}));

function CartPage(props) {
  const productList = useSelector((state) => state.cart.cartItems);
  const totalCartprice = useSelector(cartTotalSelector);
  const classes = useStyles();

  return (
    <Box>
      <Container className={classes.root}>
        <Paper>
          <Typography variant="h6" component="h5" className={classes.total}>
            Tổng: {formatPrice(totalCartprice)}
          </Typography>

          <CartList productList={productList} />
        </Paper>
      </Container>
    </Box>
  );
}

export default CartPage;
