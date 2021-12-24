import React from 'react';
import PropTypes from 'prop-types';
import FilterByCategory from './Filter/FilterByCategory';
import FilterByPrice from './Filter/FilterByPrice';
import FilterByServices from './Filter/FilterByServices';

ProductFilter.propTypes = {
    filter: PropTypes.object.isRequired,
    onFilterChange: PropTypes.func,
};

function ProductFilter({filter, onFilterChange}) {
    function handleCategoryChange(newCategoryId){
        if(!onFilterChange)return;

        const newFilter = {
            ...filter,
            "category.id": newCategoryId,
        };

        onFilterChange(newFilter);
    };

    function handlePriceChange(values) {
        if(onFilterChange){
           onFilterChange(values);
        }
    };

    function handleServicesChange(values) {
        if(onFilterChange){
           onFilterChange(values);
        }
    };

    return (
        <div>
            <FilterByCategory onCategoryChange={handleCategoryChange} />
            <FilterByPrice onChange={handlePriceChange}/>
            <FilterByServices filter={filter} onChange={handleServicesChange}/>
        </div>
    );
}

export default ProductFilter;