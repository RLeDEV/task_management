import React from 'react';
import './index.css';
import errImage from './404.png';

export default class ErrPage extends React.Component {
    render() {
        return (
            <div className="errpage">
                <div className="errpage-img"><img src={errImage} alt="404-err"/></div>
            </div>
        )
    }
}