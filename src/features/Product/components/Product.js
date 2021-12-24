import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import {STATIC_HOST} from '../../../constants';
import {THUMBNAIL_PLACEHOLDER} from '../../../constants';
import { useHistory } from 'react-router-dom';
import { formatPrice } from '../../../utils';

Product.propTypes = {
    
};

function Product({product}) {
    const thumbnail = product.thumbnail ? `${STATIC_HOST}${[product.thumbnail?.url]}`: THUMBNAIL_PLACEHOLDER;
    const history = useHistory();
    const handleClick = (product) => {
        history.push(`/products/${product.id}`);
    }

    return (
        <Box padding={1} onClick={() =>handleClick(product)}>
            <Box padding={1}>
                <img
                    src={thumbnail}
                    width="100%"
                    alt={product.name}
                />
            </Box>

            <Typography variant="body2">{product.name}</Typography>
            <Typography variant="body2">
                <Box component="span" fontSize="16px" fontWeight="bold" marginRight="1">
                    {formatPrice(product.salePrice)} 
                </Box>
                {product.promotionPercent > 0 ? ` -${product.promotionPercent}%` : ''}
            </Typography>
        </Box>
    );
}

export default Product;