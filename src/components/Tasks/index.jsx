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
        status: 'in progress'
    },
    {
        title: 'test4',
        description: 'This is the second test',
        createDate: '01/06/2020',
        estimatedDate: '04/06/2020',
        status: 'done'
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
    constructor(props){
        super(props);
        this.removeItem = this.removeItem.bind(this);
        this.state = {
            tasks: testTasks
        }
    }

    removeItem(index) {
        let currTasks = this.state.tasks;
        currTasks.splice(index, 1);
        this.setState({tasks: currTasks});
    }

    render() {
        var tasks = this.state.tasks.map((item, i) => {
            return (
                <Task info={item} id={i+1} removeItem={this.removeItem} key={i+1} />
            );
        });
        return (
            <div className="tasks-display">
                {tasks}
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
            status: 'pending',
            extended: false    
        }
        this.toggleVisible = this.toggleVisible.bind(this);
        this.onClickDelete = this.onClickDelete.bind(this);
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
                        <i className="fas fa-plus" onClick={this.toggleVisible} title="Extend"></i>
                        <i className="fas fa-trash-alt" onClick={this.onClickDelete}></i>
                        <div className="status-dropdown">
                            <div className={`status-btn ${this.state.status === 'done' ? 'done' : this.state.status === 'pending' ? 'pending' : 'in-progress'}`}>{this.state.status}</div>
                            <div className="dropdown-content">
                                <span className="dropdown-choose" onClick={() => this.setState({status: 'pending'})}>Pending</span>
                                <span className="dropdown-choose" onClick={() => this.setState({status: 'in-progress'})}>In Progress</span>
                                <span className="dropdown-choose" onClick={() => this.setState({status: 'done'})}>Done</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Task