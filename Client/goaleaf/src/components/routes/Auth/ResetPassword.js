import React, { Component } from 'react'
import './Auth.scss'
import  LogoBg from './../../../assets/leaf-bg.png'
import { Link } from 'react-router-dom'
import axios from 'axios'

class ResetPassword extends Component {

  state = {
    email: '',
    error: {
      SERVER_ERROR: false,
      EMAIL_ERROR: false,
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
    if (this.state.email.trim() === ''){
      this.setState({error: {...this.state.error, EMPTY_ERROR: true}});
      return;
    }

    // TODO  -- handle server req and res
    // redirect to NewPassword when server return 200
    // throw error when email invalid
  }

  render() {
    let errorMsg = null
    if (this.state.error.SERVER_ERROR) {
      errorMsg = <div className="ErrorMsg">Sign in unsuccessful, please try again</div>
    }
    if (this.state.error.EMAIL_ERROR) {
      errorMsg = <div className="ErrorMsg">Account with that email doesn't exist</div>
    }
    if (this.state.error.EMPTY_ERROR) {
      errorMsg = <div className="ErrorMsg">Please complete the form</div>
    }
    return (
      <div className="ResetPassword">
      <form onSubmit={ this.handleSubmit } autoComplete="off">
        <h1> Reset password </h1>
          <input className="InputField" type="email" id="email" placeholder="email" onChange={ this.handleChange } />
        { errorMsg }
          <div className="Buttons">
            <input type="submit" value="submit" />
          </div>
      </form>
      <img className="LogoBg1"src={LogoBg} alt="logo"></img>
      <img className="LogoBg2" src={LogoBg} alt="logo"></img>
      </div>
    )
  }
}

export default ResetPassword;
