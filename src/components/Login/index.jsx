import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import Main from '../Main';
import './index.css';

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

    componentDidMount() {
        if(this.props.user.token != null) {
            this.setState({loggedIn: true})
        }
    }

    auth = () => {
        const username = this.state.username;
        const password = this.state.password;
        this.props.loginUser(username, password)
        console.log(this.props.user.token)
        this.setState({loading: true})
        setTimeout(() => {
            if(this.props.user.token != null) {
                this.setState({loggedIn: true})
            }
        }, 3000)
    }

    render() {
        console.log(this.props.user.token)
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

const mapStateToProps = state => {
    return { user: state.auth }
}

export default connect(mapStateToProps, { loginUser })(Login);