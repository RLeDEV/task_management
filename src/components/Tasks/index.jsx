import React, { Component } from 'react';
import './index.css';

class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: null,
            description: null,
            createDate: null,
            estimatedDate: null,
            status: 'Pending..'    
        }
    }

    render() {
        return (
            <div className="content">
                <div className="task">
                    <div className="task-id">
                        <div className="id">1123</div>
                    </div>
                    <div className="task-info">
                        <div className="task-title">
                            <div className="header">Task Title:</div>
                            {this.state.title == null ? 'NULL' : this.state.title}
                        </div>
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
                        <div className="task-desc">
                            <div className="header">Status:</div>
                            {this.state.status == null ? 'NULL' : this.state.status}
                        </div>
                    </div>
                    <div className="task-details-extend">
                        <i className="fas fa-plus"></i>
                    </div>
                </div>
            </div>
        )
    }
}

export default Task