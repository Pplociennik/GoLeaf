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
    errorMsg: ''
  }
  handleChange = e => {
    this.setState({[e.target.id]: e.target.value})
  }
  handleSubmit = e => {
    e.preventDefault();

    if (this.state.login.trim() === '' || this.state.email.trim() === '' || this.state.password === '' || this.state.repeat_password === ''){
      this.setState({errorMsg: 'Please complete the form'});
      return;
    }

    axios.post(`/register`, {
        "emailAddress": this.state.email,
        "login": this.state.login,
        "matchingPassword": this.state.repeat_password,
        "password": this.state.password,
        "userName": ""
      })
      .then(res => this.props.history.push('/login')
     ).catch(err => this.setState({errorMsg: err.response.data.message}));
  }

  render() {
      let errorMsg = <div className="ErrorMsg">{ this.state.errorMsg }</div>

    return (
      <div className="SignIn">
      <form onSubmit={ this.handleSubmit } autoComplete="off">
        <h1> Sign In </h1>
          <input className="InputField" type="text" id="login" placeholder="login" onChange={ this.handleChange } /> 
          <input className="InputField" type="email" id="email" placeholder="email" onChange={ this.handleChange } />
          <input className="InputField" type="password" id="password" placeholder="password" onChange={ this.handleChange } />
          <input className="InputField" type="password" id="repeat_password" placeholder="repeat password" onChange={ this.handleChange } />
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
