import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import { Redirect } from 'react-router-dom';
import { Loading } from '../Utils/Loading';
import axios from 'axios';
import Alert from '../Utils/Alert';
import './index.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            password2: '',
            firstname: '',
            lastname: '',
            phone: '',
            showAlert: false,
            alertType: '',
            errMsg: ''
        }
        this.clearForm = this.clearForm.bind(this);
        this.installAlert = this.installAlert.bind(this);
    }

    clearForm() {
        this.setState({
            email: '',
            password: '',
            password2: '',
            firstname: '',
            lastname: '',
            phone: ''
        });
    }

    installAlert(type, message) {
        this.setState({
            showAlert: true,
            alertType: type,
            errMsg: message
        });
        setTimeout(() => {
            this.setState({
                showAlert: false,
                alertType: '',
                errMsg: ''
            })
        }, 2000);
    }

    // Checks if email is already exist for another user
    isUserExist = async (email) => {
        let userExistance = true;
        const body = {
            email
        }
        await axios.post('http://localhost:3001/api/users/userexist', body)
        .then(res => {
            userExistance = res.data.userExist;
        }).catch (err => {
            return err;
        })
        console.log(userExistance)
        return userExistance;
    }

    addNewUser = async (email, password, firstname, lastname,phone) => {
        const body = {
            email,
            password,
            firstname,
            lastname,
            phone
        }
        try {
            await axios.post('http://localhost:3001/api/users/register', body);
            return true;
        }
        catch(err) {
            return false;
        }
    }

    // I have to add a check *if username already exist in database*
    onFormSubmit = async () => {
        const email = this.state.email;
        const password = this.state.password;
        const verifiedPass = this.state.password2;
        const firstname = this.state.firstname;
        const lastname = this.state.lastname;
        const phone = this.state.phone;
        let errMsg = "";
        if(!email.includes("@")) {
            if(errMsg === "") {
                errMsg = "Email is not correct";
            }
        } else if(password !== verifiedPass) {
            if(errMsg === "") {
                errMsg = "Passwords are not match";
            }
        } else if (firstname === "" || lastname === "") {
            if(errMsg === "") {
                errMsg = "Please fill all the fields";
            }
        }
         else if (this.isUserExist(email) === true) { // Checks if username is already in database
            if(errMsg === "") {
                errMsg = "Email is already exist";
            }
        }
        if(errMsg !== "") {
            // Register failed
            this.clearForm();
            this.installAlert('error', errMsg);
        }
        else {
            try {
                // Register succeed
                this.addNewUser(email,password,firstname,lastname,phone);
                this.installAlert('success', 'Successfully created new user!');
                this.clearForm();
                // Redirect to login page
                setTimeout(() => {
                    this.props.history.push('/login');
                }, 1000)
            }
            catch(err) {
                // Failed on DB injection
                this.installAlert('error', 'Connection error, please try again later.');
            }
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
            <div className="register-panel">
                <div className="title">
                    Register
                </div>
                <div className="wrapper">
                    <div className="email inputs">
                        <span>Email:</span> 
                        <input type="text" placeholder="Email" value={this.state.email} onChange={(evt) => this.setState({email: evt.target.value})} required onKeyDown={(e) => {if(e.key === 'Enter'){ this.onFormSubmit()}}}></input>
                    </div>
                    <div className="password inputs">
                        <span>Password:</span> 
                        <input type="password" placeholder="Password" value={this.state.password} onChange={(evt) => this.setState({password: evt.target.value})} required onKeyDown={(e) => {if(e.key === 'Enter'){ this.onFormSubmit()}}}></input>
                    </div>
                    <div className="password2 inputs">
                        <span>Password:</span> 
                        <input type="password" placeholder="Verify Password" value={this.state.password2} onChange={(evt) => this.setState({password2: evt.target.value})} required onKeyDown={(e) => {if(e.key === 'Enter'){ this.onFormSubmit()}}}></input>
                    </div>
                    <div className="firstname  inputs">
                        <span>First Name:</span> 
                        <input type="text" placeholder="First Name" value={this.state.firstname} onChange={(evt) => this.setState({firstname: evt.target.value})} required onKeyDown={(e) => {if(e.key === 'Enter'){ this.onFormSubmit()}}}></input>
                    </div>
                    <div className="lastname inputs">
                        <span>Last Name:</span> 
                        <input type="text" placeholder="Last Name" value={this.state.lastname} onChange={(evt) => this.setState({lastname: evt.target.value})} required onKeyDown={(e) => {if(e.key === 'Enter'){ this.onFormSubmit()}}}></input>
                    </div>
                    <div className="phonenum inputs">
                        <span>Phone:</span> 
                        <input type="text" placeholder="Phone Number" value={this.state.phone} onChange={(evt) => this.setState({phone: evt.target.value})} required onKeyDown={(e) => {if(e.key === 'Enter'){ this.onFormSubmit()}}}></input>
                    </div>
                    <div className="register">
                        <div className="register-btn" onClick={this.onFormSubmit}>
                                Register
                        </div>
                    </div>
                    {this.state.showAlert ? <Alert type={this.state.alertType} error={this.state.errMsg} /> : null }
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