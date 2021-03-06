import React from 'react';
import Login from './components/Login';
import Register from './components/Register/index.jsx'
import {Router, Route, Switch, Redirect} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import { loadUser } from './actions/authActions';
import history from './components/Utils/history';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import AllTasks from './components/Tasks';
import Create from './components/Create';
import ErrPage from './components/Utils/ErrPage';
import {ProtectedRoute} from './components/Utils/ProtectedRoute';
import './App.css';

class App extends React.Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    const ProtectedRoutes = () => {
      return (
        <div>
          <Navbar/>
          <Switch>
            <Route exact path='/' render={() => <Redirect to='/dashboard'/>}/>
            <ProtectedRoute exact path='/dashboard' component={Dashboard}/>
            <ProtectedRoute exact path='/tasks' component={AllTasks}/>
            <ProtectedRoute exact path='/create' component={Create}/>
            <ProtectedRoute exact path='/404' component={ErrPage}/>
            {/* Protected Route which redirects all paths to login or dashboard based on user's status */}
            <ProtectedRoute path='*' component={() => <Redirect to='/404'/>}/>
          </Switch>
        </div>
      )
    }
    return (
      <Provider store={store}>
        <div className="App">
          <Router history={history}>
            <Switch>
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
              <Route component={ProtectedRoutes} />
            </Switch>
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
