import React , { Component } from 'react';
import {config} from '../Utils/getConfig';
import axios from 'axios';
import './index.css';

class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: null,
            description: null,
            createDate: null,
            estimatedDate: null,
            status: 'pending',
            extended: false    
        }
        this.toggleVisible = this.toggleVisible.bind(this);
        this.onClickDelete = this.onClickDelete.bind(this);
        this.onSetStatus = this.onSetStatus.bind(this);
    }

    componentDidMount() {
        this.setState({
            title: this.props.info.title,
            description: this.props.info.description,
            createDate: this.props.info.createDate,
            estimatedDate: this.props.info.estimatedDate,
            status: this.props.info.status
        })
    }

    toggleVisible() {
        const currentState = this.state.extended;
        this.setState({extended: !currentState});    
    }

    onClickDelete() {
        var index = parseInt(this.props.id - 1);
        this.props.removeItem(index);
        this.forceUpdate()
    }

    onSetStatus(newStatus) {
        const body = {
            id: this.props.info.id,
            status: newStatus
        }
        try {
            axios.post(`http://localhost:3001/api/tasks/update`, body, config())
            this.setState({status: newStatus});
        }
        catch(err){
            console.log(err);
        }
    }

    render() {
        return (
            <div className="content">
                <div className="task">
                    <div className="task-id">
                        <div className="id">{this.props.id}</div>
                    </div>
                    <div className="task-info">
                        <div className="task-title">
                            <div className="header">Task Title:</div>
                            {this.state.title == null ? 'NULL' : this.state.title}
                        </div>
                        <div className={`${this.state.extended === false ? 'extended-info-none' : 'extended-info'}`}>
                            <div className="task-desc">
                                <div className="header">Description:</div>
                                {this.state.description == null ? 'NULL' : this.state.description}
                            </div>
                            <div className="task-desc">
                                <div className="header">Created Date:</div>
                                {this.state.createDate == null ? '99-99-9999' : this.state.createDate}
                            </div>
                            <div className="task-desc">
                                <div className="header">Estimated Date:</div>
                                {this.state.estimatedDate == null ? '99-99-9999' : this.state.estimatedDate}
                            </div>
                        </div>
                    </div>
                    <div className="task-details-extend">
                        <i className="fas fa-eye" onClick={this.toggleVisible} title="Extend"></i>
                        <i className="fas fa-trash-alt" onClick={this.onClickDelete}></i>
                        <div className="status-dropdown">
                            <div className={`status-btn ${this.state.status.toLowerCase()}`}>{this.state.status}</div>
                            <div className="dropdown-content">
                                <span className="dropdown-choose" onClick={() => this.onSetStatus('pending')}>Pending</span>
                                <span className="dropdown-choose" onClick={() => this.onSetStatus('in-progress')}>In Progress</span>
                                <span className="dropdown-choose" onClick={() => this.onSetStatus('done')}>Done</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Task;