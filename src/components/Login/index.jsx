import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import {Redirect} from 'react-router-dom';
import Alert from '../Utils/Alert';
import './index.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            username: null,
            password: null,
            loading: false,
            failed: false,
            errMsg: ''
        }
    }

    componentDidMount() {
        if(this.props.user.token != null) {
            this.setState({loggedIn: true})
        }
    }

    auth = () => {
        const username = this.state.username;
        const password = this.state.password;
        
        // Changing the state in redux store
        this.props.loginUser(username, password)
        // Pushing to /app with protected route
        this.setState({loading: true})
        setTimeout(() => {
            if(this.props.user.token != null) {
                this.setState({loggedIn: true})
                this.props.history.push('/');
            }
            // Error handling
            else {
                this.setState({loading: false, failed: true, errMsg: "Incorrect username or password"})
                setTimeout(() => {
                    this.setState({failed: false})
                }, 3000)
            }
        }, 4000)
    }

    render() {
        // console.log(this.props.user.isAuthenticated)
        return (
            <Fragment>
                {this.props.user.isAuthenticated ? <Redirect to={
                    {
                        pathname: '/',
                            state: {
                                from: this.props.history.location
                            }
                    }
                } /> :
            <div className="login-panel">
                <div className="title">
                    Task Manager
                </div>
                <div className="wrapper">
                    <div className="username">
                        <span>Username:</span> 
                        <input type="text" placeholder="Username" onChange={(evt) => this.setState({username: evt.target.value})} required onKeyDown={(e) => {if(e.key === 'Enter'){ this.auth()}}}></input>
                    </div>
                    <div className="password">
                        <span>Password:</span> 
                        <input type="password" placeholder="Password" onChange={(evt) => this.setState({password: evt.target.value})} required onKeyDown={(e) => {if(e.key === 'Enter'){ this.auth()}}}></input>
                    </div>
                    <div className="login-btn" onClick={() => this.auth()}>
                            {this.state.loading ? <div>Loading..  <i className="fas fa-sync fa-spin"></i></div> : 'Login' }
                    </div>
                    {this.state.failed ? <Alert type="error" error={this.state.errMsg} /> : null }
                </div>
            </div>
            }
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return { user: state.auth }
}

export default connect(mapStateToProps, { loginUser })(Login);