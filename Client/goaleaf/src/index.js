import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/rootReducer'

const store = createStore(rootReducer);

const token = localStorage.getItem('token');
// If we have a token, consider the user to be signed in
if (token) {
  // we need to update application state
  store.dispatch({ type: 'AUTH_USER' , token: token });
}

store.dispatch({ type: 'GET_USERS'});

ReactDOM.render(<Provider store={ store }><App /></Provider>, document.getElementById('root'));


serviceWorker.unregister();
