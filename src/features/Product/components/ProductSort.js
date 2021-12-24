import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs } from '@material-ui/core';

ProductSort.propTypes = {
    current: PropTypes.string,
    handleSortChange: PropTypes.func,
};

function ProductSort({currentSort, handleSortChange}) {

    function handleChange(event, value) {
        handleSortChange(value)
    }
    
    return (
        <Tabs
            value={currentSort}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
            aria-label="disabled tabs example"
        >
            <Tab label="Gia tu thap den cao" value="salePrice:ASC"/>
            <Tab label="Gia tu cao xuong thap" value="salePrice:DESC"/>
        </Tabs>
    );
}

export default ProductSort;