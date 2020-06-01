import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {Route} from 'react-router-dom';
import {AllTasks} from '../Tasks';
import './index.css';

export default class Navbar extends Component {
    render() {
        return (
            <div className="navbar">
                <React.Fragment>
                    <div className="wrapper">
                        <div className="top-navbar">
                            <div className="top-menu">
                                    <NavLink style={{textDecoration: 'none'}} className="logo" exact to='/'>
                                        <div>Task Manager</div>
                                    </NavLink>
                                <ul className="nav-menu">
                                    <li className="nav-item">
                                        <NavLink className="link" exact to="/">
                                            <i className="fas fa-chart-line"></i>Dashboard
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="link" exact to="/tasks">
                                            <i className="fas fa-tasks"></i>Tasks
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="link" exact to="/create">
                                            <i className="fas fa-plus-square"></i>Create
                                        </NavLink>
                                    </li>
                                </ul>
                                <ul className="nav-manage">
                                    <li className="user-name"><div><i className="fas fa-user-circle"></i></div></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div>
                        {/* <Route
                        exact path="/"
                        render={props => <Dashboard />}
                        /> */}
                        <Route
                            path="/tasks"
                            render={props => <AllTasks />}
                        />
                        {/* <Route
                        exact path="/create"
                        render={props => <Create />}
                        /> */}
                    </div>
                </React.Fragment>
            </div>
        )
    }
}



