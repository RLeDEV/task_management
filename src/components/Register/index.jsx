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
            username: '',
            password: '',
            password2: '',
            email: '',
            firstname: '',
            lastname: '',
            failed: false,
            errMsg: ''
        }
    }

    onSubmit = async () => {
        const username = this.state.username;
        const password = this.state.password;
        const verifiedPass = this.state.password2;
        const email = this.state.email;
        const firstname = this.state.firstname;
        const lastname = this.state.lastname;
        // I should continue on making checks here to verify that everything is correct with the form        
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
                    Register
                </div>
                <div className="wrapper">
                    <div className="username">
                        <span>Username:</span> 
                        <input type="text" placeholder="Username" onChange={(evt) => this.setState({username: evt.target.value})} required></input>
                    </div>
                    <div className="password">
                        <span>Password:</span> 
                        <input type="password" placeholder="Password" onChange={(evt) => this.setState({password: evt.target.value})} required></input>
                    </div>
                    <div className="password">
                        <span>Password:</span> 
                        <input type="password" placeholder="Verify Password" onChange={(evt) => this.setState({password2: evt.target.value})} required></input>
                    </div>
                    <div className="password">
                        <span>First Name:</span> 
                        <input type="text" placeholder="First Name" onChange={(evt) => this.setState({firstname: evt.target.value})} required></input>
                    </div>
                    <div className="password">
                        <span>Last Name:</span> 
                        <input type="text" placeholder="Last Name" onChange={(evt) => this.setState({lastname: evt.target.value})} required></input>
                    </div>
                    <div className="password">
                        <span>Email:</span> 
                        <input type="text" placeholder="Email" onChange={(evt) => this.setState({password: evt.target.value})} required></input>
                    </div>
                    <div className="register">
                        <div className="register-btn" onClick={this.onSubmit}>
                                Register
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