import React, { Component } from 'react';
import { connect } from 'react-redux';
import Task from './Task';
import axios from 'axios';
import './index.css';
class AllTasks extends Component {
    constructor(props){
        super(props);
        this.removeItem = this.removeItem.bind(this);
        this.state = {
            tasks: []
        }
    }

    removeItem(index) {
        let currTasks = this.state.tasks;
        currTasks.splice(index, 1);
        this.setState({tasks: currTasks});
    }

    render() {
        // Checks if uid is already initalized in redux and fetching tasks from API
        if(this.props.user.user !== null) {
            const uid = this.props.user.user.results[0].id;
            if(this.state.tasks.length < 1) {
                try {
                    axios.get(`http://localhost:3001/api/tasks/user/${uid}`)
                    .then (response => this.setState({tasks: response.data.data}));
                }
                catch(err) {
                    console.log(err);
                }
            }
        }
        if(this.state.tasks !== null) {
            var tasks = this.state.tasks.map((item, i) => {
                return (
                    <Task info={item} id={i+1} removeItem={this.removeItem} key={i+1} />
                );
            });
        }
        return (
            <div className="tasks-display">
                {tasks}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { user: state.auth }
}

export default connect(mapStateToProps)(AllTasks);