import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
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
                                    <li className="nav-item"><i className="fas fa-chart-line"></i>Dashboard</li>
                                    <li className="nav-item"><i className="fas fa-tasks"></i>Tasks</li>
                                    <li className="nav-item"><i className="fas fa-plus-square"></i>Create</li>
                                </ul>
                                <ul className="nav-manage">
                                    <li className="user-name"><div><i className="fas fa-user-circle"></i></div></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            </div>
        )
    }
}



