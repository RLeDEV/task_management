import React from 'react';
import './index.css';

export default class Statistic extends React.Component {
    render() {
        return (
            <div className="statistic">
                <div className="wrapper">
                    <div className="name" style={{backgroundColor: this.props.style}}>{this.props.name}</div>
                    <div className="quantity">{this.props.quantity}</div>
                </div>
            </div>
        )
    }
}