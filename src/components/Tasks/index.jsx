import React, { Component } from 'react';
import { connect } from 'react-redux';
import Task from './Task';
import axios from 'axios';
import {Loading} from '../Utils/Loading';
import {config} from '../Utils/getConfig';

import './index.css';
class AllTasks extends Component {
    constructor(props){
        super(props);
        this.removeItem = this.removeItem.bind(this);
        this.onFilterByCategoryChange = this.onFilterByCategoryChange.bind(this);
        this.onStatusChange = this.onStatusChange.bind(this);
        this.state = {
            tasks: [],
            filterByGroup: null,
            filterByTitle: ''
        }
    }

    removeItem(index) {
        let currTasks = this.state.tasks;
        currTasks.splice(index - 1, 1);
        this.setState({tasks: currTasks});
    }

    onFilterByCategoryChange(category) {
        this.setState({filterByGroup: category});
    }

    onStatusChange(taskId, status) {
        // Moving a task which changed its status from the old status category to the new status category.
        const tasks = this.state.tasks;
        tasks[taskId - 1].status = status;
        this.setState({tasks});
    }

    render() {
        // Checks if uid is already initalized in redux and fetching tasks from API
        if(this.props.user.user !== null) {
            const uid = this.props.user.user.results[0].id;
            if(this.state.tasks.length < 1) {
                try {
                    axios.get(`http://localhost:3001/api/tasks/user/${uid}`, config())
                    .then (response => this.setState({tasks: response.data.data}));
                }
                catch(err) {
                    console.log(err);
                }
            }
        }
        if(this.state.tasks !== null) {
            var tasks = this.state.tasks.map((item, i) => {
                // Display tasks that are in the same status group and contains the title the user inserted
                // Related to tasks that are sorted by status and by title
                if(this.state.filterByGroup !== null && item.status === this.state.filterByGroup && this.state.filterByTitle !== '' && item.title.toLowerCase().includes(this.state.filterByTitle.toLowerCase())) {
                    return <Task info={item} id={i+1} removeItem={this.removeItem} key={i+1} statusChange={this.onStatusChange} />
                }
                // Display tasks that contains the title the user inserted
                else if(this.state.filterByTitle !== '' && item.title.toLowerCase().includes(this.state.filterByTitle.toLowerCase())) {
                    return <Task info={item} id={i+1} removeItem={this.removeItem} key={i+1} statusChange={this.onStatusChange} />
                }
                // Display tasks that are in the same status group when the user didn't insert filter by title
                else if(this.state.filterByGroup !== null && item.status === this.state.filterByGroup && this.state.filterByTitle === '') {
                    return <Task info={item} id={i+1} removeItem={this.removeItem} key={i+1} statusChange={this.onStatusChange} />
                }
                // Display all tasks ('All' btn)
                else if(this.state.filterByGroup === null && this.state.filterByTitle === '') {
                    return <Task info={item} id={i+1} removeItem={this.removeItem} key={i+1} statusChange={this.onStatusChange} />
                }
                return null;
            });
        }
        return (
            <div className="tasks-display">
                <div className="tasks-filter">
                    <div className="filter-by-group">
                        Category:
                        <div className="filter-btn" style={{backgroundColor:'#a5e412'}} onClick={() => this.onFilterByCategoryChange('pending')}>Pending</div>
                        <div className="filter-btn" style={{backgroundColor:'rgb(4, 176, 255)'}} onClick={() => this.onFilterByCategoryChange('in-progress')}>In Progress</div>
                        <div className="filter-btn" style={{backgroundColor:'rgb(255, 164, 60)'}} onClick={() => this.onFilterByCategoryChange('done')}>Done</div>
                        <div className="filter-btn" style={{backgroundColor:'rgb(192, 71, 182)'}} onClick={() => this.onFilterByCategoryChange(null)}>All</div>
                    </div>
                    <div className="filter-by-title">
                        Sreach By Title: 
                        <input type="text" id="filter-txt" placeholder="Insert title of task" onChange={e => this.setState({filterByTitle: e.target.value})}/>
                    </div>
                </div>
                {tasks.length > 0 ? tasks : <Loading/>}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { user: state.auth }
}

export default connect(mapStateToProps)(AllTasks);