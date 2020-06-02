import React from 'react';
import Sidebar from './components/Navbar';
import Login from './components/Login';
import {BrowserRouter} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Sidebar /> */}
        <Login />
      </BrowserRouter>
    </div>
  );
}

export default App;
