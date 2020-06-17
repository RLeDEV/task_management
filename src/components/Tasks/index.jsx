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
            tasks: [],
            uid: null
        }
    }

    componentDidMount() {
        setTimeout(() => {
            if(this.state.uid === null) {
                this.setState({uid: this.props.user.user.user[0].id})
            }
        }, 400)
        if(this.state.uid !== null) {
            fetch(`http://localhost:3001/tasks/user/${this.state.uid}`)
                .then(response => response.json())
                .then(data => this.setState({ tasks: data.data }));
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
        if(this.state.uid !== null && this.state.tasks.length < 1) {
            fetch(`http://localhost:3001/tasks/user/${this.state.uid}`)
            .then(response => response.json())
            .then(data => this.setState({ tasks: data.data }));
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