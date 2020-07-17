import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import { Redirect } from 'react-router-dom';
import { Loading } from '../Utils/Loading';
import { Link } from 'react-router-dom';
import Alert from '../Utils/Alert';
import './index.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            username: null,
            password: null,
            failed: false,
            errMsg: ''
        }
    }

    componentDidMount() {
        if(this.props.user.token != null) {
            this.setState({loggedIn: true})
        }
    }

    auth = async () => {
        const username = this.state.username;
        const password = this.state.password;
        
        // Changing the state in redux store
        await this.props.loginUser(username, password)
        // Error handling
        if(this.props.user.token === null) {
            this.setState({failed: true, errMsg: "Incorrect username or password"})
        }
    }

    render() {
        return (
            <Fragment>
                {this.props.user.isAuthenticated ? <Redirect to={
                    {
                        pathname: '/',
                            state: {
                                from: this.props.history.location
                            }
                    }
                } /> : this.props.user.isLoading ?
                 <Loading />
                 :
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
                            Login
                    </div>
                    <div className="register">
                        <span>Don't have a user? Register now</span>
                        <div className="register-btn">
                                <Link className="link" to='/register'>Register</Link>
                        </div>
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