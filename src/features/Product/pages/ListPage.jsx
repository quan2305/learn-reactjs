import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import productApi from '../../../api/productApi';
import ProductSkeletonList from '../components/ProductSkeletonList';
import ProductList from '../components/ProductList';

ListPage.propTypes = {
    
};

const useStyles = makeStyles((theme)=>({
    root: {},
    left: {
        width: '250px'},
    right: {
        flex: '1'
    },
}))

function ListPage(props) {
    const classes = useStyles(props);
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true); 

    useEffect(() =>{
        try {
            (async() => {
                const {data} = await productApi.getAll({_page: 1, _limit: 10});
                setProductList(data);
                //setLoading(false);
            })()
        } catch (e) {
           // setLoading(false);
        }
        setLoading(false);
    }, [])

    return (
        <Box>
            <Container>
                <Grid container spacing={1}>
                    <Grid item className={classes.left}>
                        <Paper elevation={0}> left Column</Paper>
                    </Grid>
                    <Grid item className={classes.right}>
                        <Paper elevation={0}>
                            { {loading} ? <ProductSkeletonList/> : <ProductList data={productList}/>}
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default ListPage;