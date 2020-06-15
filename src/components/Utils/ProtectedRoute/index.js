import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import { useStore } from 'react-redux';
export const ProtectedRoute = ({ component: Component, ...rest }) => {
    const store = useStore();
    const auth = store.getState();
    return (
        <Route
            {...rest}
            render={props => {
                if(auth.auth.isAuthenticated === true) {
                    return <Component {...props} />;
                }
                else {
                    return <Redirect to={
                        {
                            pathname: '/',
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