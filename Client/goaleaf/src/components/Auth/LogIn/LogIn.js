import React, { Component } from 'react'
import './LogIn.scss'
import  LogoBg from './../../../assets/leaf-bg.png'
import { Link } from 'react-router-dom'
import axios from 'axios'

class LogIn extends Component {

  state = {
    login: null,
    password: null,
    errorMsg: null
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = e => {
    e.preventDefault();
    axios.post(`http://localhost:8080/login`, {
      "Token": "",
      "login": this.state.login,
      "password": this.state.password
    })
    .then(res => {console.log("User succesfully logged in");
                  localStorage.setItem('token', res.data);
                  this.props.history.push('/');
                  window.location.reload();
                }
    ).catch(err => {this.setState({error: true}); console.log(err)})
  }
  render() {
    let errorMsg = null
    if (this.state.error) {
      errorMsg = <div className="Error">Log In unsuccessful, please try again</div>
    }
    return (
      <div className="LogIn">
      <form onSubmit={ this.handleSubmit } autoComplete="off">
        <h1> Log In </h1>
        <label>
          login 
          <input className="InputField" type="text" id="login" onChange={ this.handleChange } />
        </label>
        <label>
          password 
          <input className="InputField" type="password" id="password" onChange={ this.handleChange } />
        </label>
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
