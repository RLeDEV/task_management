import React from 'react';
import './index.css';

export const Loading = () => {
    return (
        <div className="loading-spinner">
            <div className="loader"></div>
            <div className="content">
                Loading..
            </div>
        </div>
    )
}