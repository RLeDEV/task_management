import React from 'react';
import Login from './components/Login';
import {Router, Route, Switch, Redirect} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import { loadUser } from './actions/authActions';
import history from './components/Utils/history';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import AllTasks from './components/Tasks';
import ErrPage from './components/Utils/ErrPage';
import {ProtectedRoute} from './components/Utils/ProtectedRoute';
import './App.css';

class App extends React.Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Router history={history}>
            <Navbar />
          <Switch>
              <Route exact path='/' render={() => <Redirect to='/dashboard'/>}/>
              <Route exact path='/login' component={Login} />
              <ProtectedRoute exact path='/dashboard' component={Dashboard}/>
              <ProtectedRoute exact path='/tasks' component={AllTasks}/>
              <Route exact path='/404' component={ErrPage}/>
              {/* Protected Route which redirects all paths to login or dashboard based on user's status */}
              <ProtectedRoute path='*' component={() => <Redirect to='/404'/>}/>
            </Switch>
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
