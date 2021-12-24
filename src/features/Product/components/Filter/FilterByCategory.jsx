import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import categoryApi from '../../../../api/categoryApi';
import { Box, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root:{
        padding: theme.spacing(2),
    },
    menu:{
        padding: 0,
        margin: 0,
        listStyleType: 'none',

      '& > li': {
          marginTop: theme.spacing(1),
          '&:hover':{
              cursor: 'pointer',
              color: theme.palette.primary.dark,
          },
      }  
    }
}))

FilterByCategory.propTypes = {
    onCategoryChange: PropTypes.func,
};

function FilterByCategory({onCategoryChange}) {
    const [listCategory, setListCategory] = useState([]);
    const classes = useStyles();

    useEffect(()=>{
        (async () => {
            try{
                const list = await categoryApi.getAll();
                setListCategory( list.map(category => ({
                    id: category.id,
                    name: category.name,
                    }))
                );

                

            } catch(e){

            }
        })()
    }, []);

    function handleOnClick(category){
        if(onCategoryChange){
            localStorage.setItem('category_id', category.name);
            onCategoryChange(category.id);
        }
    }

    return (
        <Box className={classes.root}>
            <Typography variant="subtitle2">Danh muc san pham</Typography>
            <ul className={classes.menu}>
                {listCategory.map(category => (
                    <li key={category.id} onClick={() => (handleOnClick(category))}>
                        <Typography variant="body2">{category.name}</Typography>
                    </li>))
                }
            </ul>
        </Box>
    );
}

export default FilterByCategory;