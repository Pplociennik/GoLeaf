import React, { Component } from 'react'
import styles from './SignIn.module.scss'
import { Link } from 'react-router-dom'

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
    e.preventDefault();
    console.log(this.state)
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
