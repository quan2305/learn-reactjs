import React from 'react';
import PropTypes from 'prop-types';
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from '../../../constants';
ProductThumbnail.propTypes = {
    
};

function ProductThumbnail({product}) {
    const thumbnail = product.thumbnail ? `${STATIC_HOST}${[product.thumbnail?.url]}`: THUMBNAIL_PLACEHOLDER;

    return (
        <img
            src={thumbnail}
            width="100%"
            alt={product.name}
        />
    );
}

export default ProductThumbnail;