import React from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import useDetailProduct from '../hook/useDetailProduct';
import ProductThumbnail from '../components/ProductThumbnail';
import ProductInfo from '../components/ProductInfo';
import AddToCartForm from '../components/AddToCartForm';
import ProductMenu from '../components/ProductMenu';
import ProductDescription from '../components/ProductDescription';

const useStyles = makeStyles((theme)=>({
    root: {},
    left: {
        width: '400px'
    },
    right: {
        flex: '1',
        marginRight: theme.spacing(2),
    },
    pagination: {
        marginTop: '20px',
        display: 'flex',
        justifyContent: 'center',
        paddingBottom: '20px',
    },
    img:{
        padding: theme.spacing(4)
    }
}))

DetailProductPage.propTypes = {
    
};

function DetailProductPage({}) {
    
    const classes = useStyles();
    const {params: {idProduct},
            url
    } = useRouteMatch(); 
  

    const {product, loading} = useDetailProduct(idProduct);


    if(loading){
        return <Box>Loading</Box>;
    }

    const handleCartToSubmit = (formValues) => {
        console.log(formValues);
    };

    return (
        <Box>
            <Container >
                <Paper>
                    <Grid container spacing={2}>
                        <Grid item className={classes.left}>
                            <Box className={classes.img}>
                               <ProductThumbnail product={product} />
                            </Box>
                        </Grid>
                        <Grid item className={classes.right}>
                            <ProductInfo product={product} />
                            <AddToCartForm onSubmit={handleCartToSubmit}/>
                        </Grid>
                    </Grid>
                </Paper>

                <ProductMenu/>

                <Switch>
                    <Route path={url} exact>
                        <ProductDescription product={product}/>
                    </Route>
                </Switch>
                
            </Container>
        </Box>
    );
}

export default DetailProductPage;