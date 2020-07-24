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
        this.state = {
            profileImg: ''
        }
    }

    componentWillMount() {

    }

    componentDidUpdate(){
        this.updateImg();
    }

    updateImg() {
        if(this.props.user.isAuthenticated && this.state.profileImg === '') {
            this.setState({profileImg: this.props.user.user.results[0].userImg});
        }
    }

    logOut() {
        // Loging the user out using redux action & navigating to login page
        this.props.logoutUser();
    }

    render() {
        return (
            <div className="navbar">
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
                                        <div className="profile">
                                            { this.state.profileImg !== 'Forbidden' && this.state.profileImg !== '' ?
                                            <div id="user-menu-img" style={{  
                                                // eslint-disable-next-line
                                                backgroundImage: "url(" + `${this.state.profileImg}` + ")",
                                                backgroundPosition: 'center',
                                                backgroundSize: 'cover',
                                                backgroundRepeat: 'no-repeat'
                                              }}/>
                                            :
                                             <i className="fas fa-user-circle user-menu-icon"></i>
                                            }
                                            <div className="user-menu-drop-down">
                                                <div className="tirangle"></div>
                                                <Link className="link" to='/profile'>
                                                    <span>Profile</span>
                                                </Link>
                                                <Link className="link" to='/login'>
                                                    <span onClick={this.logOut}>Logout</span>
                                                </Link>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
                
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { user: state.auth }
}

export default withRouter(connect(mapStateToProps, { logoutUser })(Navbar));