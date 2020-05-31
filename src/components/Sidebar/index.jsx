import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import logo from './logo.png';
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
                                <ul>
                                    <li className="nav-item"><i className="fas fa-chart-line"></i>Dashboard</li>
                                    <li className="nav-item"><i className="fas fa-tasks"></i>Tasks</li>
                                    <li className="nav-item"><i className="fas fa-plus-square"></i>Create</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            </div>
        )
    }
}



