import React, { Component } from 'react';
import { connect } from 'react-redux';
import Task from './Task';
import axios from 'axios';
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

class AllTasks extends Component {
    constructor(props){
        super(props);
        this.removeItem = this.removeItem.bind(this);
        this.state = {
            tasks: testTasks,
            uid: null
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.user.user !== this.props.user.user) {
            const uid = this.props.user.user.user[0].id;
            this.setState({uid});
        }
    }

    removeItem(index) {
        let currTasks = this.state.tasks;
        currTasks.splice(index, 1);
        this.setState({tasks: currTasks});
    }


    render() {
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