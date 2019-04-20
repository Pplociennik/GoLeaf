import React, { Component } from 'react';
import './App.scss';
import Navbar from './components/containers/Navbar/Navbar';
import Main from './components/containers/Main/Main';
import { BrowserRouter } from 'react-router-dom';
import {fetchHabits} from './index';
import {fetchUsers} from './index';
import store from './index'

class App extends Component {

  componentDidMount() {
    store.dispatch(fetchHabits());
    store.dispatch(fetchUsers());
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Main />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
