import React, { Component } from 'react'
import './Auth.scss'
import  LogoBg from './../../../assets/leaf-bg.png'
import { Link } from 'react-router-dom'
import axios from 'axios'

class ResetPassword extends Component {

  state = {
    password: '',
    repeat_password: '',
    token: this.props.location.token,
    errorMsg: ''
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = e => {
    e.preventDefault();
    if (this.state.password === '' || this.state.repeat_password === ''){
      this.setState({errorMsg: 'Please complete the form'});
      return;
    }

    axios.post('/api/users/setnewpassword', {
      
      "matchingPassword": this.state.password,
      "password": this.state.repeat_password, 
      "token": this.state.token
  })
  .then(res => {
                this.setState({errorMsg: 'Password changed'})
               }
  ).catch(err => this.setState({errorMsg: err.response.data.message}))
  }

  render() {
    let errorMsg = <div className="ErrorMsg">{ this.state.errorMsg }</div>
    if (this.state.errorMsg === 'Password successfully changed') {
      errorMsg = <div className="SuccessMsg">{ this.state.errorMsg}</div>
    }

    return (
      <div className="ResetPassword">
      <form onSubmit={ this.handleSubmit } autoComplete="off">
        <h1> New password </h1>
          <input className="InputField" type="password" id="password" placeholder="password" onChange={ this.handleChange } />
          <input className="InputField" type="password" id="repeat_password" placeholder="repeat password" onChange={ this.handleChange } />
        { errorMsg }
          <div className="Buttons">
            <input type="submit" value="Submit" />
          </div>
      </form>
      <img className="LogoBg1"src={LogoBg} alt="logo"></img>
      <img className="LogoBg2" src={LogoBg} alt="logo"></img>
      </div>
    )
  }
}

export default ResetPassword;
  