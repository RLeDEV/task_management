import React from 'react';
import {Route,Redirect} from 'react-router-dom';
// import { useStore } from 'react-redux';
export const ProtectedRoute = ({ component: Component, ...rest }) => {
    // const store = useStore();
    // const auth = store.getState();
    const token = localStorage.getItem('token');
    console.log(token)
    return (
        <Route
            {...rest}
            render={props => {
                if(token !== null) {
                    return <Component {...props} />;
                }
                else {
                    return <Redirect to={
                        {
                            pathname: '/login',
                            state: {
                                from: props.location
                            }
                        }
                    } />
                }
            }}
        />
    )
}