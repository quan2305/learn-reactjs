import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Grid, Paper, Tab, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import productApi from '../../../api/productApi';
import ProductSkeletonList from '../components/ProductSkeletonList';
import ProductList from '../components/ProductList';
import { Pagination } from '@material-ui/lab';
import ProductSort from '../components/ProductSort';
import ProductFilter from '../components/ProductFilter';
import FilterViewer from '../components/FilterViewer';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';

ListPage.propTypes = {
    
};

const useStyles = makeStyles((theme)=>({
    root: {},
    left: {
        width: '250px'
    },
    right: {
        flex: '1'
    },
    pagination: {
        marginTop: '20px',
        display: 'flex',
        justifyContent: 'center',
        paddingBottom: '20px',
    }
}))

function ListPage(props) {
    const classes = useStyles(props);
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true); 
    const history = useHistory();
    const location = useLocation();
    const queryParams = useMemo(() => {
        const params = queryString.parse(location.search);
        return {
            ...params,
            _page: parseInt(params._page) || 1, 
            _limit: parseInt(params._limit) || 10,
            _sort: params._sort || 'salePrice:ASC',
            isFreeShip: params.isFreeShip === 'true',
            isPromotion: params.isPromotion === 'true',
        }
    }, [location.search]);

    // const [filter, setFilter] = useState({
    //     ...queryParams,
    //     _page: parseInt(queryParams._page) || 1, 
    //     _limit: parseInt(queryParams._limit) || 10,
    //     _sort: queryParams._sort || 'salePrice:ASC',
    // });
    const [paginations, setPaginations] =useState({
        limit: 10,
        total: 120,
        page: 1,
    });

    // useEffect(() =>{
    //     //Sync filter to url
    //     history.push({
    //         pathname: history.location.pathname,
    //         search: queryString.stringify(queryParams),
    //     });
    // },[queryParams, history]);

    useEffect(() =>{
        (async() => {
            try {
                const {data, pagination} = await productApi.getAll(queryParams);
                setProductList(data);
                setPaginations(pagination);
            } 
            catch (e) {

            } 
            setLoading(false);

        })()
            
        
    }, [queryParams]);

    function handlePaginationChange(e, page) {
        // setFilter( prevFilter => (
        //     {
        //     ...prevFilter, 
        //     _page: page,
        //     }
        // ))
        const newFilter = {
            ...queryParams,
            _page: page,
        };

        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(newFilter),
        });

    };

    function handleSortChange(value){
        // setFilter( prevFilter => (
        //     {
        //     ...prevFilter, 
        //     _sort: value,
        //     }
        // ))

        const newFilter = {
            ...queryParams,
            _sort: value,
        };

        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(newFilter),
        });
    }

    function handleFilterChange(newFilters){
        // setFilter( prevFilter => (
        //     {
        //     ...prevFilter, 
        //     ...newFilters,
        //     }
        // ))

        const newFilter = {
            ...queryParams,
            ...newFilters,
        };

        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(newFilter),
        });
    }

    function handleFilterViewerChange(newFilters){
        //setFilter(newFilters);

        const newFilter = {
            ...newFilters,
        };

        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(newFilter),
        });
    }

    
    return (
        <Box>
            <Container>
                <Grid container spacing={1}>
                    <Grid item className={classes.left}>
                        <Paper elevation={0}>
                            <ProductFilter filter={queryParams} onFilterChange={handleFilterChange}/>
                        </Paper>
                    </Grid>
                    <Grid item className={classes.right}>
                        <Paper elevation={0}>
                            <ProductSort currentSort={queryParams._sort} handleSortChange={handleSortChange} />

                            <FilterViewer filter={queryParams} onChange={handleFilterViewerChange} />
                            
                            { loading ? <ProductSkeletonList/> : <ProductList data={productList}/>}
                            

                            <Box className={classes.pagination}>
                                <Pagination color="primary" 
                                    count={Math.ceil(paginations.total / paginations.limit)} 
                                    page={paginations.page} 
                                    onChange={handlePaginationChange}
                                >
                                </Pagination>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default ListPage;