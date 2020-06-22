import React from 'react';
import './index.css';

export default class Create extends React.Component {
    render() {
        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let calcedMonth = month < 10 ? '0' + month : month;
        let year = newDate.getFullYear();
        const currentDate = year + '-' + calcedMonth + '-' + date;
        console.log(currentDate)
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
                                    <input type="text" id="task-name" placeholder="Enter a task name"/>
                                </li>
                                <li>
                                    <label htmlFor="description">Description</label>
                                    <input type="text" id="description" placeholder="Enter your task description"/>
                                </li>
                                <li>
                                    <label htmlFor="current-date">Created Date</label>
                                    <input type="date" id="created-date" value={currentDate} disabled/>
                                </li>
                                <li>
                                    <label htmlFor="estimated-date">Estimated Date</label>
                                    <input type="date" id="estimated-date"/>
                                </li>
                                <li>
                                    <button type="submit">Submit</button>
                                </li>
                            </ul>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}