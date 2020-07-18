import React from 'react';
import './index.css';

export default class Alert extends React.Component {
    render() {
        return (
            <div className="alert">
                <div className={this.props.type === 'warning' ? ' warning' : this.props.type === 'error' ? ' error' : ' succeed'}>
                    <div className="alert-title">
                        {this.props.type.toUpperCase()}:
                    </div>
                    <div className="alert-content">
                        {this.props.error}
                    </div>
                </div>
            </div>
        )
    }
}