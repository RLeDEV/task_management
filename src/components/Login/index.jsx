import React, {Component, Fragment} from 'react';
import Main from '../Main';
import './index.css';
import { Redirect } from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            username: null,
            password: null,
            loading: false
        }
    }

    auth = () => {
        if(this.state.username === 'razlevy' && this.state.password === '220993') {
            this.setState({loading: true})
            setTimeout(() => this.setState({loggedIn: true}), 5000)
        } else {
            alert('Username or password are incorrect');
        }
    }

    render() {
        return (
            <Fragment>
                {this.state.loggedIn ? <Main /> :
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
                </div>
            </div>
            }
            </Fragment>
        )
    }
}

export default Login;