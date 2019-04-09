import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/rootReducer';
import axios from 'axios';

const store = createStore(rootReducer);

const token = localStorage.getItem('token');
// If we have a token, consider the user to be signed in
axios.post('/validatetoken', {
      
  "Token": token
})
.then(res => {
      store.dispatch({ type: 'AUTH_USER' , token: token })
           }
).catch(err => console.log(err))


// GET USER REQUEST
axios.get(`/api/users/all`)
.then(res => {
  store.dispatch({ type: 'GET_USERS', payload: res.data}); 
} 
).catch(err => console.log(err))



ReactDOM.render(<Provider store={ store }><App /></Provider>, document.getElementById('root'));


serviceWorker.unregister();

