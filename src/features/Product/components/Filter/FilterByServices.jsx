import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, TextField, Button, makeStyles, FormControlLabel, Checkbox } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        borderTop: `1px solid ${theme.palette.grey[300]}`
    },
    service:{
       listStyleType: 'none',
    },
}))

FilterByServices.propTypes = {
    onChange: PropTypes.func,
    filter: PropTypes.object,
};

function FilterByServices ({filter, onChange}) {
    const classes = useStyles();

    function handleChange(e){
        const{name, checked} = e.target;
        onChange({
            [name]: checked,
        })
    };

    


    return (
        <Box className={classes.root}>
            <Typography>Dich vu</Typography>

            {[{value:'isPromotion', label: 'Khuyen mai'}, {value:'isFreeShip', label: 'Free ship'} ].map((service, index) => (
                <li key={index} className={classes.service}>
                    <FormControlLabel
                        control={
                        <Checkbox
                            checked={Boolean(filter[service.value])}
                            onChange={handleChange}
                            name={service.value}
                            color="Primary"
                        />
                        }
                        label={service.label}
                    />
                </li>
                
            ))}
            
        </Box>
    );
}

export default FilterByServices;