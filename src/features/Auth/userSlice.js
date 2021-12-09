import userApi from '../../api/userApi';

const {createSlice, createAsyncThunk} = require('@reduxjs/toolkit')

export const register = createAsyncThunk(
    'users/register',
    async (payload) => {
        const data = await userApi.register(payload);
        
        //save data to local storage
        localStorage.setItem('access_token', data.jwt_token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        return data.user;
    }
);

export const login = createAsyncThunk(
    'users/login',
    async (payload) => {
        const data = await userApi.login(payload);
        
        //save data to local storage
        localStorage.setItem('access_token', data.jwt_token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        return data.user;
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        current: JSON.parse(localStorage.getItem('user')) || {},
        settings:{},
    },
    reducers:{
       logout: (state, action) => {
           localStorage.removeItem('access_token');
           localStorage.removeItem('user');

           state.current = {};
       }
    },
    extraReducers:{
        [register.fulfilled]: (state, action) => {
            state.current = action.payload;
        },
        [login.fulfilled]: (state, action) => {
            state.current = action.payload;
        },
    }
});

const {actions, reducer} = userSlice;
export const {logout} = actions;
export default reducer;
