import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import './App.scss';
import Navbar from './components/containers/Navbar/Navbar';
import Main from './components/containers/Main/Main';
import Loader from './components/routes/Loader/Loader'
import { BrowserRouter } from 'react-router-dom';
import {fetchHabits} from './js/state';
import {isLoaded} from './js/state';
import { connect } from 'react-redux'
import axios from 'axios';

class App extends Component {

  componentDidMount() {
    axios.get('https://glf-api.herokuapp.com/')
    .then(res => { this.validateUser() }
    ).catch(err => { this.validateUser() })
  }

  validateUser() {
    axios.post('https://glf-api.herokuapp.com/validatetoken', {
      "Token": localStorage.getItem('token')
    }).then(res => { 
      this.props.validateUser() 
    }
    ).catch(err => { this.props.invalidateUser()})
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
    isLoading: state.isLoading
  }
}

const mapDispatchToProps = dispatch => ({
  validateUser: () => dispatch({ type: 'VALIDATE_USER', token: localStorage.getItem('token')}),
  invalidateUser: () => dispatch({ type: 'INVALIDATE_USER' }),
  fetchHabits: () => dispatch(fetchHabits()),
  isLoaded: () => dispatch(isLoaded())

})

export default connect(mapStateToProps, mapDispatchToProps)(App);
