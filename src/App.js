import React, { useEffect } from 'react';
import Login from './components/Login';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import { loadUser } from './actions/authActions';
import './App.css';

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
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

export default App;
