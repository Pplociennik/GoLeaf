import React, { Component } from 'react'
import styles from './SignIn.module.scss'
import { Link } from 'react-router-dom'
import axios from 'axios'

class SignIn extends Component {

  state = {
    email: null,
    login: null,
    password: null
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = e => {
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
       }).catch(err => console.log(err))
  }
  render() {
    return (
      <div className={styles.SignIn}>
      <form onSubmit={ this.handleSubmit }>
        <h1> Sign In </h1>
        <label>
          email 
          <input className={styles.InputField} type="email" id="email" onChange={ this.handleChange } />
        </label>
        <label>
          login 
          <input className={styles.InputField} type="text" id="login" onChange={ this.handleChange } />
        </label>
        <label>
          password 
          <input className={styles.InputField} type="password" id="password" onChange={ this.handleChange } />
        </label>
          <div className={styles.Buttons}>
            <input type="submit" value="Sign in" />
            <Link to='/login'><input type="button" value="Log in" /></Link>
          </div>
      </form>
      </div>
    )
  }
}

export default SignIn;
