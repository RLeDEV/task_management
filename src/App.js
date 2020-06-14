import React from 'react';
import Login from './components/Login';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import { loadUser } from './actions/authActions';
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
            <Login />
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}

export default App;
