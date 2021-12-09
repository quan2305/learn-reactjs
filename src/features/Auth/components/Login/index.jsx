import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from '../LoginForm';
import {useDispatch} from 'react-redux';
import { login } from '../../userSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';

Login.propTypes = {
    
};

function Login(props) {
    const dispatch = useDispatch();
    const {enqueueSnackbar} = useSnackbar();

    const handleSubmit = async (values) => {
       
        try {
           
            console.log('Form Submit:', values);
            const action = login(values);
            const resultAction = await dispatch(action);
            console.log('resultAction: ',resultAction);
            const user = unwrapResult(resultAction);

            //close dialog
            const {closeDialog} = props;
            if(closeDialog){
                closeDialog();
            }
            

            //do something here on register successfully
           
        } catch (err) {
            enqueueSnackbar('Failed to login', {variant: 'error'});
            console.log(err.message, err);
        }
    };


    return (
        <div>
            <LoginForm onSubmit={handleSubmit}/>
        </div>
    );
}

export default Login;