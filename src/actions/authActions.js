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

    // Get user's info
    var user;
    var tasksStatus;
    axios.get('http://localhost:3001/api/users/auth', tokenConfig(getState))
    .then(async (res) => {
        user = res.data;
        let email = user.results[0].email;
        // Getting tasks status
        await axios.get('http://localhost:3001/api/statistics/all', { params: { email }})
        .then (tasksRes => {
            tasksStatus = tasksRes.data.finalRes;
        })
        // Adding tasks status to user information
        user.results[0]["tasksStatus"] = tasksStatus
        dispatch({
            type: LOGIN_LOADED,
            payload: user
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
        const res = await axios.post('http://localhost:3001/api/users/login', body, config);
        const tasksStatus = await axios.get('http://localhost:3001/api/statistics/all', { params: { email }});
        // Adding tasks status to user information
        res.data.user.results[0]["tasksStatus"] = tasksStatus.data.finalRes;
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

export const logoutUser = () => dispatch => {
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