import React from 'react';
import PropTypes from 'prop-types';
import {useSelector, useDispatch } from 'react-redux';
import {increase, decrease} from './counterSlice';

CounterFeature.propTypes = {
    
};

function CounterFeature(props) {
    const counter = useSelector(state => state.counter);
    const dispatch = useDispatch();

    const handleIncreaseClick = () => {
        const action = increase();
        dispatch(action);
    };

    const handleDecreaseClick = () => {
        const action = decrease();
        dispatch(action);
    };

    return (
        <div>
            Counter Feature: {counter}
            <button onClick={ handleIncreaseClick}>InCrease</button>
            <button onClick={ handleDecreaseClick}>DeCrease</button>
        </div>
        
    );
}

export default CounterFeature;