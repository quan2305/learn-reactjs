import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import {FormHelperText, TextField}  from '@material-ui/core';

InputField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,

    label: PropTypes.string,
    disabled: PropTypes.bool
    
};

function InputField(props) {
    const {form, name, label, disabled} = props;
    const {errors, formState} = form;
    const hasError =  errors[name];

    return (
        <Controller
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
        />
        
    );
}

export default InputField;