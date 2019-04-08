import React, { Component } from 'react'
import './Auth.scss'
import  LogoBg from './../../../assets/leaf-bg.png'
import { Link } from 'react-router-dom'
import axios from 'axios'

class ResetPassword extends Component {

  state = {
    email: '',
    errorMsg: ''
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = e => {
    e.preventDefault();
    if (this.state.email.trim() === ''){
      this.setState({errorMsg: 'Please complete the form'});
      return;
    }

    this.setState({errorMsg: 'waiting'})

    axios.post('/api/users/resetpassword', {
      
        "emailAddress": this.state.email
    })
    .then(res => {
                  this.setState({errorMsg: 'Please check your email'})
                 }
    ).catch(err => this.setState({errorMsg: err.response.data.message}))
  }

  render() {
    let errorMsg = <div className="ErrorMsg">{ this.state.errorMsg }</div>
      if (this.state.errorMsg === 'Please check your email') {
        errorMsg = <div className="SuccessMsg">{ this.state.errorMsg}</div>
      }
      if (this.state.errorMsg === 'waiting') {
        errorMsg = <div className="WaitingMsg"></div>
      }
    return (
      <div className="ResetPassword">
      <form onSubmit={ this.handleSubmit } autoComplete="off">
        <h1> Reset password </h1>
          <input className="InputField" type="email" id="email" placeholder="email" onChange={ this.handleChange } />
        { errorMsg }
          <div className="Buttons">
            <input type="submit" value="Submit" />
            <Link to='/login'><input type="button" value="Log in" /></Link>
          </div>
      </form>
      <img className="LogoBg1"src={LogoBg} alt="logo"></img>
      <img className="LogoBg2" src={LogoBg} alt="logo"></img>
      </div>
    )
  }
}

export default ResetPassword;
