import React, { Component } from 'react'
import './Auth.scss'
import  LogoBg from './../../../assets/leaf-bg.png'
import { Link } from 'react-router-dom'
import axios from 'axios'

class ResetPassword extends Component {

  state = {
    code: '',
    password: '',
    repeat_password: '',
    error: {
      SERVER_ERROR: false,
      CODE_ERROR: false,
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
    if (this.state.code.trim() === '' || this.state.password === '' || this.state.repeat_password === ''){
      this.setState({error: {...this.state.error, EMPTY_ERROR: true}});
      return;
    }

    // TODO  -- handle server req and res
  }

  render() {
    let errorMsg = null
    if (this.state.error.SERVER_ERROR) {
      errorMsg = <div className="ErrorMsg">Sign in unsuccessful, please try again</div>
    }
    if (this.state.error.CODE_ERROR) {
      errorMsg = <div className="ErrorMsg">Invalid code</div>
    }
    if (this.state.error.EMPTY_ERROR) {
      errorMsg = <div className="ErrorMsg">Please complete the form</div>
    }
    return (
      <div className="ResetPassword">
      <form onSubmit={ this.handleSubmit } autoComplete="off">
        <h1> New password </h1>
          <input className="InputField" type="text" id="code" placeholder="code" onChange={ this.handleChange } />
          <input className="InputField" type="password" id="password" placeholder="password" onChange={ this.handleChange } />
          <input className="InputField" type="password" id="repeat_password" placeholder="repeat password" onChange={ this.handleChange } />
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
