import React, { Component } from 'react'
import './Auth.scss'
import  LogoBg from './../../../assets/leaf-bg.png'
import { Link } from 'react-router-dom'
import axios from 'axios'

class LogIn extends Component {

  state = {
    login: '',
    password: '',
    errorMsg: ''
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = e => {
    e.preventDefault();

    if (this.state.login.trim() === '' || this.state.password === ''){
      this.setState({errorMsg: 'Please complete the form'});
      return;
    }

    axios.post('/login', {
      "Token": "",
      "login": this.state.login,
      "password": this.state.password
    })
    .then(res => {
                  localStorage.setItem('token', res.data);
                  this.props.history.push('/');
                  window.location.reload();
                 }
    ).catch(err => this.setState({errorMsg: err.response.data.message}))
  }
  render() {
      let errorMsg = <div className="ErrorMsg">{ this.state.errorMsg }</div>

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
