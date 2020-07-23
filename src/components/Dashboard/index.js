import React from 'react';
import Profile from './Profile';
import Statistic from './Statistic';
import { Loading } from '../Utils/Loading';
import { connect } from 'react-redux';
import './index.css';

class Dashboard extends React.Component {
    constructor() {
        super();
        this.pendingStyle = "#a5e412";
        this.inprogressStyle = "rgb(4, 176, 255)";
        this.doneStyle = "rgb(255, 164, 60)";
        this.allStyle = "rgb(192, 71, 182)";
    }
    render() {
        if(this.props.user.user){
            let tasksStatus = this.props.user.user.results[0].tasksStatus;
            var fullName = this.props.user.user.results[0].firstname + ' ' + this.props.user.user.results[0].lastname;
            var phone = this.props.user.user.results[0].phone;
            var email = this.props.user.user.results[0].email;
            var regDate = this.props.user.user.results[0].reg_date;
            var pendings = tasksStatus.pendings;
            var inprogress = tasksStatus.inprogress;
            var done = tasksStatus.done;
        }
        return (
            !this.props.user.isAuthenticated ? 
            <Loading />
            :
            <div className="dashboard-pnl">
                <div className="left-panel">
                    <Profile fullName={fullName} phone={phone} email={email} reg_date={regDate} image={this.props.user.user.results[0].userImg}/>
                </div>
                <div className="right-panel">
                    <Statistic name="All Tasks" quantity={done+pendings+inprogress} style={this.allStyle}/>
                    <Statistic name="Pending" quantity={pendings} style={this.pendingStyle}/>
                    <Statistic name="In Progress" quantity={inprogress} style={this.inprogressStyle}/>
                    <Statistic name="Done" quantity={done} style={this.doneStyle}/>
                </div>
            </div>
        )
    };
};


const mapStateToProps = state => {
    return { user: state.auth }
}

export default connect(mapStateToProps, {})(Dashboard);