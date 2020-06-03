import React, {Component} from 'react';
import Sidebar from '../Navbar';
import { BrowserRouter } from 'react-router-dom';

class Main extends Component {
    render() {
        return (
            <BrowserRouter>
                <Sidebar />
            </BrowserRouter>
        )
    }
}

export default Main;