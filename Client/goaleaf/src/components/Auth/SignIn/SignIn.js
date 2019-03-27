import React, { Component } from 'react'
import './SignIn.scss'
import  LogoBg from './../../../assets/leaf-bg.png'
import { Link } from 'react-router-dom'
import axios from 'axios'

class SignIn extends Component {

  state = {
    login: null,
    email: null,
    password: null,
    error: false
  }
  handleChange = e => {
    this.setState({[e.target.id]: e.target.value})
  }
  handleSubmit = e => {
    e.preventDefault();
    axios.post(`http://localhost:8080/register`, {
        "Token": "",
        "emailAddress": this.state.email,
        "login": this.state.login,
        "matchingPassword": this.state.password,
        "password": this.state.password,
        "userName": ""
      })
      .then(res => {console.log("User succesfully signed in", res);
                    this.props.history.push('/login');
       }).catch(err => this.setState({error: true}));
  }


  render() {
    let errorMsg = null
    if (this.state.error) {
      errorMsg = <div className="Error">Sign in unsuccessful, please try again</div>
    }
    return (
      <div className="SignIn">
      <form onSubmit={ this.handleSubmit } autoComplete="off">
        <h1> Sign In </h1>
        <label>
          email 
          <input className="InputField" type="email" id="email" onChange={ this.handleChange } />
        </label>
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
