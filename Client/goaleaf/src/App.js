import React, { Component } from 'react';
import './App.scss';
import Navbar from './components/containers/Navbar/Navbar';
import Main from './components/containers/Main/Main';
import { BrowserRouter } from 'react-router-dom';
import {fetchHabits} from './index';
import {fetchUsers} from './index';
import {fetchMembers} from './index';
import store from './index'
import { connect } from 'react-redux'

class App extends Component {

  componentDidMount() {
    store.dispatch(fetchHabits());
    store.dispatch(fetchMembers());
    store.dispatch(fetchUsers());
  }
  render() {
    console.log(this.props)
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

const mapStateToProps = state => {
  return {
    habits: state.habits,
    users: state.users,
    members: state.members
  }
}

export default connect(mapStateToProps, null)(App);
