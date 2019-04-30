import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import { Provider } from 'react-redux';
import rootReducer from './reducers/rootReducer';
import axios from 'axios';

const store = createStore(rootReducer, applyMiddleware(thunk));

const token = localStorage.getItem('token');

// GET USERS
export function fetchUsers() {
  return function(dispatch){
axios.get(`/api/users/all`)
      .then(res => {
      store.dispatch({ type: 'GET_USERS', payload: res.data});
     } )
  }}

// GET HABITS
export function fetchHabits(){
 return function(dispatch){
    axios.get(`/api/habits/all`)
      .then(res => {
        dispatch({ type: 'GET_HABITS', payload: res.data});
      })
      }
    };

// GET MEMBERS
export function fetchMembers(){
 return function(dispatch){
    axios.get(`/api/members/all`)
      .then(res => {
        dispatch({ type: 'GET_MEMBERS', payload: res.data});
      })
      }
    };

axios.post('/validatetoken', {
  "Token": token
}).then(res => {
      store.dispatch({ type: 'VALIDATE_USER', token: token})
      renderApp();

           }
).catch(err => {store.dispatch({ type: 'INVALIDATE_USER'})
            renderApp();
})

const renderApp = () => {
  ReactDOM.render(<Provider store={ store }><App /></Provider>, document.getElementById('root'));
}

serviceWorker.unregister();

export default store;

