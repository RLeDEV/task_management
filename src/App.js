import React from 'react';
import Sidebar from './components/Navbar';
import Tasks from './components/Tasks';
import {BrowserRouter} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Sidebar />
        <Tasks />
      </BrowserRouter>
    </div>
  );
}

export default App;
