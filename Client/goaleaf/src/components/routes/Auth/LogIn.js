import React, { Component } from 'react'
import './Auth.scss'
import  LogoBg from './../../../assets/leaf-bg.png'
import { Link } from 'react-router-dom'
import axios from 'axios'

class LogIn extends Component {

  state = {
    login: '',
    password: '',
    error: {
      SERVER_ERROR: false,
      PASSWORD_ERROR: false,
      LOGIN_ERROR: false,
      EMPTY_ERROR: false
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = e => {
    e.preventDefault();

    if (this.state.login.trim() === '' || this.state.password === ''){
      this.setState({error: {...this.state.error, EMPTY_ERROR: true}});
      return;
    }

    axios.post(`http://localhost:8080/login`, {
      "Token": "",
      "login": this.state.login,
      "password": this.state.password
    })
    .then(res => {
                  localStorage.setItem('token', res.data);
                  this.props.history.push('/');
                  window.location.reload();
                 }
                // TODO -- more errors handling
    ).catch(err => this.setState({error: {...this.state.error, SERVER_ERROR: true}}))
  }
  render() {
    let errorMsg = null
    if (this.state.error.SERVER_ERROR) {
      errorMsg = <div className="ErrorMsg">Sign in unsuccessful, please try again</div>
    }
    if (this.state.error.PASSWORD_ERROR) {
      errorMsg = <div className="ErrorMsg">Password must contains at least 6 characters</div>
    }
    if (this.state.error.LOGIN_ERROR) {
      errorMsg = <div className="ErrorMsg">Login already exist</div>
    } 
    if (this.state.error.EMPTY_ERROR) {
      errorMsg = <div className="ErrorMsg">Please complete the form</div>
    }
    return (
      <div className="LogIn">
      <form onSubmit={ this.handleSubmit } autoComplete="off">
        <h1> Log In </h1> 
          <input className="InputField" type="text" id="login" placeholder="login" onChange={ this.handleChange } />
          <input className="InputField" type="password" id="password" placeholder="password" onChange={ this.handleChange } />
        { errorMsg }
          <div className="Buttons">
            <input type="submit" value="Log in" />
            <Link to='/signin'><input type="button" value="Sign in" /></Link>
          </div>
          <Link to='/reset-password' className="ForgotPassword">Forgot password?</Link>
      </form>
      <img className="LogoBg1"src={LogoBg} alt="logo"></img>
      <img className="LogoBg2" src={LogoBg} alt="logo"></img>
      </div>
    )
  }
}

export default LogIn;
