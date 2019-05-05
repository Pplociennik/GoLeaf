import React, { Component } from 'react';
import './App.scss';
import Navbar from './components/containers/Navbar/Navbar';
import Main from './components/containers/Main/Main';
import Loader from './components/routes/Loader/Loader'
import { BrowserRouter } from 'react-router-dom';
import {fetchHabits} from './index';
import {fetchUsers} from './index';
import {fetchMembers} from './index';
import {isLoaded} from './index';
import store from './index'
import { connect } from 'react-redux'

class App extends Component {

  componentDidMount() {
    Promise.all([
    store.dispatch(fetchHabits()),
    store.dispatch(fetchMembers()),
    store.dispatch(fetchUsers())
    ]).then(() => store.dispatch(isLoaded()))
  }
  render() {

    if(this.props.isLoading){
      return(
        <BrowserRouter>
        <div className="App">
          <Navbar />
          <Loader />
        </div>
      </BrowserRouter>
      )
    }

    this.props.habits.forEach(habit => {
      habit.members = [];
      this.props.users.forEach(user => {
        if(habit.creatorID === user.id){
          habit.owner = user;
        }
      })
      this.props.members.forEach(member => {
        if(habit.id === member.habitID){
          habit.members.push(member.userID)
        }
      })
    })


    this.props.habits.forEach(habit => {
      habit.membersObj = [];
      habit.members.forEach(memberId => habit.membersObj.push(this.props.users.find(user => memberId === user.id)
    ))});

    
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
    members: state.members,
    isLoading: state.isLoading
  }
}

export default connect(mapStateToProps, null)(App);
