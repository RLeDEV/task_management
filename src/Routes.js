import React from 'react';
import { Router, Route } from 'react-router';
import Sidebar from './components/Navbar';
import Login from './components/Login';
import {AllTasks} from './components/Tasks';

const createRoutes = () => (
    <Router>
      <Route exact path="/" component={Sidebar}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/tasks" component={AllTasks}/>
    </Router>
);

export default createRoutes;