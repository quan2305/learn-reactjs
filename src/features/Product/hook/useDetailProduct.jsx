import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import productApi from '../../../api/productApi';

useDetailProduct.propTypes = {
    productId: PropTypes.number,
    
};

function useDetailProduct(productId) {
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            (async() => {
                const data = await productApi.get(productId);
                console.log(data);
                setProduct(data);
                setLoading(false)
            })()
        } catch (e) {

        }
        
    }, []);


    return {product, loading}
    ;
}

export default useDetailProduct;