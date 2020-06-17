import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { withRouter } from 'react-router';
import './index.css';

class Navbar extends Component {
    constructor(props){
        super(props);
        this.logOut = this.logOut.bind(this);
    }

    logOut() {
        // Loging the user out using redux action & navigating to login page
        this.props.logoutUser();
        this.props.history.push('/login');
    }
    render() {
        return (
            <div className="navbar">
                {/* Checks if the path is login, if yes it will not display anything */}
                {this.props.location.pathname==='/login' ? false :
                
                // Navbar displaytion
                <React.Fragment>
                    <div className="wrapper">
                        <div className="top-navbar">
                            <div className="top-menu">
                                    <Link style={{textDecoration: 'none'}} className="logo" to='/'>
                                        <div>Task Manager</div>
                                    </Link>
                                <ul className="nav-menu">
                                    <li className="nav-item">
                                        <Link className="link" to="/">
                                            <i className="fas fa-chart-line"></i>Dashboard
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="link" to="/tasks">
                                            <i className="fas fa-tasks"></i>Tasks
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="link" to="/create">
                                            <i className="fas fa-plus-square"></i>Create
                                        </Link>
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
                </React.Fragment>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { user: state.auth }
}

export default withRouter(connect(mapStateToProps, { logoutUser })(Navbar));