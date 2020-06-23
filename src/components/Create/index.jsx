import React from 'react';
import { config } from '../Utils/getConfig';
import { connect } from 'react-redux';
import './index.css';
import Alert from '../Utils/Alert';
import axios from 'axios';

// Define of current date
let newDate = new Date()
let date = newDate.getDate();
let month = newDate.getMonth() + 1;
let calcedMonth = month < 10 ? '0' + month : month;
let year = newDate.getFullYear();
const currentDate = year + '-' + calcedMonth + '-' + date;

class Create extends React.Component {
    constructor() {
        super();
        this.state = {
            taskName: null,
            description: null,
            currentDate: currentDate,
            estimatedDate: null,
            sending: false
        }
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    async onFormSubmit() {
        // I still need to make it.
        const taskName = this.state.taskName;
        const description = this.state.description;
        const createdDate = this.state.currentDate;
        const estimatedDate = this.state.estimatedDate;
        const status = 'pending';
        const uid = this.props.user !== null ? this.props.user.user.results[0].id : null;
        const body = JSON.stringify({ 
            taskName,
            description,
            createdDate,
            estimatedDate,
            status,
            uid
        });
        try {
            await axios.post('http://localhost:3001/api/tasks/new', body, config());
            this.setState({
                taskName: '',
                estimatedDate: '',
                description: '',
                sending: true
            })
            // Showing an success alert for 3 seconds
            setTimeout(() => {
                this.setState({sending: false});
            }, 3000)
        }
        catch(err) {
            console.log(err);
        }
    }

    render() {      
        return (
            <div className="create-task">
                <div className="content">
                    <div className="title">
                        Create New Task
                    </div>
                    <div className="form">
                        <form>
                            <ul className="flex-outer">
                                <li>
                                    <label htmlFor="task-name">Task Name</label>
                                    <textarea value={this.state.taskName} type="text" id="task-name" placeholder="Enter a task name" onChange={e => this.setState({taskName: e.target.value})}/>
                                </li>
                                <li>
                                    <label htmlFor="description">Description</label>
                                    <textarea value={this.state.description} type="text" id="description" placeholder="Enter your task description" onChange={e => this.setState({description: e.target.value})}/>
                                </li>
                                <li>
                                    <label htmlFor="current-date">Created Date</label>
                                    <input type="date" id="created-date" value={currentDate} disabled/>
                                </li>
                                <li>
                                    <label htmlFor="estimated-date">Estimated Date</label>
                                    <input value={this.state.estimatedDate} type="date" id="estimated-date" min={currentDate} onChange={e => this.setState({estimatedDate: e.target.value})}/>
                                </li>
                                <li>
                                    <div className="submit-btn" onClick={this.onFormSubmit}>Submit</div>
                                </li>
                                <li>
                                    {/* Success alert display */}
                                    {this.state.sending ? <Alert type="succeed" error="The task has been added to your tasks list, now you can manage its status."/> : null}
                                </li>
                            </ul>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { user: state.auth }
}

export default connect(mapStateToProps, {})(Create);