import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import CartPage from './pages/CartPage';

CartFeature.propTypes = {
    
};

function CartFeature(props) {
    const match = useRouteMatch();

    return (
        <Box pt={4}>
            <Switch>
                <Route path={match.url} component={CartPage} />
            </Switch>
        </Box>
    );
}

export default CartFeature;