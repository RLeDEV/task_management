import React from 'react';
import Sidebar from './components/Navbar';
import {BrowserRouter} from 'react-router-dom';
import './App.css';
import { AllTasks } from './components/Tasks';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Sidebar />
        <div className="tasks-view">
          <AllTasks />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
