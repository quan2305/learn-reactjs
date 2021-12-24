import {React, useState} from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import {Box, TextField, Typography}  from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { AddCircleOutline, RemoveCircleOutline, RemoveCircleOutlined } from '@material-ui/icons';


QuantityField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,

    label: PropTypes.string,
    disabled: PropTypes.bool
    
};

const useStyles = makeStyles((theme) => ({
    root: {},
    box: {
        display: 'flex',
        flexFlow: 'row',
        maxWidth: '200px'
    }
}))

function QuantityField(props) {
    const classes = useStyles();
    const {form, name, label, disabled} = props;
    const {errors, setValue} = form;
    const hasError =   errors[name];

    

    return (
        <div>
            {/* <Controller
                name={name}
                control={form.control}
                as={TextField}

                margin="normal"
                variant="outlined"
                fullWidth
                label={label}
                disabled={disabled}

                error={!!hasError}
                helperText={errors[name]?.message}
            /> */}

            <FormControl margin="normal" fullWidth variant="outlined" size='small'>
            <Typography>{label}</Typography>
            <Controller
                name={name}
                control={form.control}
                render={({onChange, onBlur, value, name}) => (
                    <Box className= {classes.box}>
                        <IconButton onClick={() => setValue(name, Number.parseInt(value) - 1)}>
                            <RemoveCircleOutline/>
                        </IconButton>

                        <OutlinedInput
                            id={name}
                            type="number"
                            disabled={disabled}
                            error={!!hasError}
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                        />

                        <IconButton onClick={() => setValue(name, Number.parseInt(value) + 1)}>
                            <AddCircleOutline/>
                        </IconButton>
                    </Box>
                    
                )}
                
            
            
            />
            <FormHelperText error={!!hasError}>{errors[name]?.message}</FormHelperText>
            </FormControl>
        </div>
        
    );
}

export default QuantityField;