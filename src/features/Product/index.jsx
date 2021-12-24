import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import ListPage from './pages/ListPage';
import { useRouteMatch } from 'react-router-dom';
import { Box } from '@material-ui/core';
import DetailProductPage from './pages/DetailProductPage';

ProductFeature.propTypes = {
    
};

function ProductFeature(props) {
    const match = useRouteMatch();

    return (
        <Box pt={4}>
            <Switch>
                <Route path={match.url} exact component={ListPage} />
                <Route path={`${match.url}/:idProduct`} exact component={DetailProductPage} />
            </Switch>
        </Box>
    );
}

export default ProductFeature;