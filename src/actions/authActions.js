import {
    LOGIN_LOADING,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT_SUCCESS,
    LOGIN_LOADED
} from '../constants/index';
import axios from 'axios';


export const loadUser = () => (dispatch, getState) => {
    // User loading
    dispatch({ type: LOGIN_LOADING });

    axios.get('http://localhost:3001/users/auth', tokenConfig(getState))
    .then(res => {
        dispatch({
            type: LOGIN_LOADED,
            payload: res.data
        })
    }).catch (err => {
        dispatch({
            type: LOGIN_FAILED
        })
    })
}

export const loginUser = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    dispatch({ type: LOGIN_LOADING });
    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post('http://localhost:3001/users/login', body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        // dispatch(loadUser());

        return res.data.token;
    } catch (err) {
        dispatch({
            type: LOGIN_FAILED
        })
    }
};

export const logOut = () => dispatch => {
    dispatch({ type: LOGOUT_SUCCESS });
}

export const tokenConfig = (getState) => {
    const token = getState().auth.token;
    
    const config = {
        headers: {
        'Content-type': 'application/json'
        }
    };

    if (token) {
        config.headers['x-auth-token'] = token;
    }

    return config;
};