import React from 'react';
import './index.css'

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.reg_date = this.props.reg_date.substring(0,10);
    }
    render() {
        return (
            <div className="profile">
                    <div className="wrapper">
                    <div className="profile-img">
                        {this.props.image !== 'Forbidden' ? <img src={this.props.image} alt="profile-image" id="user-menu-img"/>:
                        <i className="fas fa-user-circle user-menu-icon"></i>
                        }
                    </div>
                    <div className="user-info">
                        <div className="email"><span>Email:</span>{this.props.email}</div>
                        <div className="fullname"><span>Full Name:</span>{this.props.fullName}</div>
                        <div className="phone"><span>Phone Number:</span>{this.props.phone}</div>
                        <div className="reg_date"><span>Register Date:</span>{this.reg_date}</div>
                    </div>
                </div>
            </div>
        )
    }
}