import React from 'react';
import './index.css';

export const Loading = () => {
    return (
        <div className="loading-spinner">
            <center><div className="loader"></div></center>
            <div className="content">
                Loading..
            </div>
        </div>
    )
}