import React, {Component, Fragment} from 'react';
import {NavLink,Route,Redirect} from 'react-router-dom';
import {AllTasks} from '../Tasks';
import './index.css';

class Login extends Component {

    render() {
        return (
            <Fragment>
            <div className="login-panel">
                <div className="title">
                    Task Manager
                </div>
                <div className="wrapper">
                    <div className="username">
                        <span>Username:</span> 
                        <input type="text" placeholder="Username" required></input>
                    </div>
                    <div className="password">
                        <span>Password:</span> 
                        <input type="password" placeholder="Password" required></input>
                    </div>
                    <div className="login-btn">
                            Login
                    </div>
                </div>
                <div>
                    <Route
                        path="/tasks"
                        component={AllTasks}
                    />
                </div>
            </div>
            </Fragment>
        )
    }
}

export default Login;