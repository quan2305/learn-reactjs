import React from 'react';
import PropTypes from 'prop-types';
import RegisterForms from '../RegisterForm';
import {useDispatch} from 'react-redux';
import { register } from '../../userSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';

Register.propTypes = {
    
};

function Register(props) {
    const dispatch = useDispatch();
    const {enqueueSnackbar} = useSnackbar();

    const handleSubmit = async (values) => {
       
        try {
            values.username = values.email;
            console.log('Form Submit:', values);
            const action = register(values);
            const resultAction = await dispatch(action);
            const user = unwrapResult(resultAction);

            //close dialog
            const {closeDialog} = props;
            if(closeDialog){
                closeDialog();
            }
            

            //do something here on register successfully
            enqueueSnackbar('Register successfully', {variant: 'success'});
        } catch (err) {
            enqueueSnackbar(err.message, {variant: 'error'});
            console.log(err.message, err);
        }
    };


    return (
        <div>
            <RegisterForms onSubmit={handleSubmit}/>
        </div>
    );
}

export default Register;