import React, { Component } from 'react';
import './index.css';

let testTasks = [
    {
        title: 'test1',
        description: 'This is a test',
        createDate: '01/06/2020',
        estimatedDate: '03/06/2020',
        status: 'pending'
    },
    {
        title: 'test2',
        description: 'This is the second test',
        createDate: '01/06/2020',
        estimatedDate: '04/06/2020',
        status: 'pending'
    },
    {
        title: 'test3',
        description: 'This is test 3',
        createDate: '01/06/2020',
        estimatedDate: '04/06/2020',
        status: 'On board'
    },
    {
        title: 'test4',
        description: 'This is the second test',
        createDate: '01/06/2020',
        estimatedDate: '04/06/2020',
        status: 'Done'
    },
    {
        title: 'test2',
        description: 'This is the second test',
        createDate: '01/06/2020',
        estimatedDate: '04/06/2020',
        status: 'pending'
    },
    {
        title: 'test2',
        description: 'This is the second test',
        createDate: '01/06/2020',
        estimatedDate: '04/06/2020',
        status: 'pending'
    },
    {
        title: 'test2',
        description: 'This is the second test',
        createDate: '01/06/2020',
        estimatedDate: '04/06/2020',
        status: 'pending'
    }
]

export class AllTasks extends Component {
    render() {
        return (
            <div className="tasks-display">
                {testTasks.map((item,i) => <Task info={item} id={i+1} />)}
            </div>
        )
    }
}

class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: null,
            description: null,
            createDate: null,
            estimatedDate: null,
            status: 'pending'    
        }
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
    render() {
        console.log(this.props)
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
                    <div className="task-details-extend">
                        <i className="fas fa-plus"></i>
                        <div className="status-dropdown">
                            <div className="status-btn">{this.state.status}</div>
                            <div className="dropdown-content">
                                <span className="dropdown-choose">Pending</span>
                                <span className="dropdown-choose">On board</span>
                                <span className="dropdown-choose">Done</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Task