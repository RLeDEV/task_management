import {
    LOGIN_LOADING,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    AUTH_ERROR,
    LOGIN_LOADED,
    LOGOUT_SUCCESS
} from '.././constants';

const initialState = {
    token : localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case LOGIN_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case LOGIN_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            };
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false
            };
        case LOGIN_FAILED:
        case AUTH_ERROR:
        case LOGOUT_SUCCESS:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false
            };
        default:
            return state;
    }
}