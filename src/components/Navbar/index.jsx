import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { withRouter } from 'react-router';
import AllTasks from '../Tasks';
import './index.css';

class Navbar extends Component {
    constructor(props){
        super(props);
        this.logOut = this.logOut.bind(this);
    }

    // componentDidUpdate(prevProps) {
    //     // Getting the email of the user
    //     if (prevProps.user.user !== this.props.user.user) {
    //       console.log(this.props.user.user.user[0].email)
    //     }
    // }

    logOut() {
        this.props.logoutUser();
        this.props.history.push('/');
        window.location.href = '/'
    }
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
                                    <li className="user-name">
                                        <div>
                                            <i className="fas fa-user-circle user-menu-icon"></i>
                                            <div className="user-menu-drop-down">
                                                <span>Profile</span>
                                                <span onClick={this.logOut}>Logout</span>
                                            </div>
                                        </div>
                                    </li>
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

const mapStateToProps = state => {
    return { user: state.auth }
}

export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));