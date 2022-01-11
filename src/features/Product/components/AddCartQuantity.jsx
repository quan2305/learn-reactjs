import React from 'react';
import PropTypes from 'prop-types';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Avatar, Button, LinearProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import QuantityField from '../../../components/form-controls/QuantityField';

const useStyles = makeStyles((theme) => ({
  submit: {
    width: '240px',
  },
}));

AddCartQuantity.propTypes = {
  onSubmit: PropTypes.func,
};

function AddCartQuantity({ onSubmit = null }) {
  const classes = useStyles();

  const schema = yup.object().shape({
    quantity: yup
      .number()
      .min(1, 'Minimum value is 1')
      .required('Please enter quantity')
      .typeError('Please enter a number'),
  });
  const form = useForm({
    defaultValues: {
      quantity: 1,
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    if (onSubmit) await onSubmit(values);
  };

  return (
    <div>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <QuantityField name="quantity1" label="Quantity" form={form} />

        <Button type="submit" variant="contained" color="primary" className={classes.submit}>
          Add to Cart
        </Button>
      </form>
    </div>
  );
}

export default AddCartQuantity;
