import React from 'react';
import Login from './components/Login';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import { loadUser } from './actions/authActions';
import Main from './components/Main';
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
          <BrowserRouter>
          <Switch>
              <Route exact path='/' component={Login} />
              <ProtectedRoute exact path='/app' component={Main}/>
            </Switch>
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}

export default App;
