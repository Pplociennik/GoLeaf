import React, { Component } from 'react'
import './Auth.scss'
import  LogoBg from './../../../assets/leaf-bg.png'
import { Link } from 'react-router-dom'
import axios from 'axios'

class SignIn extends Component {

  state = {
    login: '',
    email: '',
    password: '',
    repeat_password: '',
    error: {
      SERVER_ERROR: false,
      PASSWORD_ERROR: false,
      LOGIN_ERROR: false,
      EMAIL_ERROR: false,
      EMPTY_ERROR: false
    }
  }
  handleChange = e => {
    this.setState({[e.target.id]: e.target.value})
  }
  handleSubmit = e => {
    e.preventDefault();

    if (this.state.login.trim() === '' || this.state.email.trim() === '' || this.state.password === '' || this.state.repeat_password === ''){
      this.setState({error: {...this.state.error, EMPTY_ERROR: true}});
      return;
    }

    axios.post(`http://localhost:8080/register`, {
        "Token": "",
        "emailAddress": this.state.email,
        "login": this.state.login,
        "matchingPassword": this.state.repeat_password,
        "password": this.state.password,
        "userName": ""
      })
      .then(res => this.props.history.push('/login')
     ).catch(err => this.setState({error: {...this.state.error, SERVER_ERROR: true}}));
  }

  render() {
    let errorMsg = null
    if (this.state.error.SERVER_ERROR) {
      errorMsg = <div className="ErrorMsg">Sign in unsuccessful, please try again</div>
    }
    if (this.state.error.PASSWORD_ERROR) {
      errorMsg = <div className="ErrorMsg">Password at least 6 characters</div>
    }
    if (this.state.error.LOGIN_ERROR) {
      errorMsg = <div className="ErrorMsg">Login already exist</div>
    }
    if (this.state.error.EMAIL_ERROR) {
      errorMsg = <div className="ErrorMsg">Account with that email already exist</div>
    }
    if (this.state.error.EMPTY_ERROR) {
      errorMsg = <div className="ErrorMsg">Please complete the form</div>
    }
    return (
      <div className="SignIn">
      <form onSubmit={ this.handleSubmit } autoComplete="off">
        <h1> Sign In </h1>
        <label>
          login 
          <input className="InputField" type="text" id="login" onChange={ this.handleChange } />
        </label>
        <label>
          email 
          <input className="InputField" type="email" id="email" onChange={ this.handleChange } />
        </label>
        <label>
          password 
          <input className="InputField" type="password" id="password" onChange={ this.handleChange } />
        </label>
        <label>
          repeat password 
          <input className="InputField" type="password" id="repeat_password" onChange={ this.handleChange } />
        </label>
        { errorMsg }
          <div className="Buttons">
            <input type="submit" value="Sign in" />
            <Link to='/login'><input type="button" value="Log in" /></Link>
          </div>
      </form>
      <img className="LogoBg1"src={LogoBg} alt="logo"></img>
      <img className="LogoBg2" src={LogoBg} alt="logo"></img>
      </div>
    )
  }
}

export default SignIn;
