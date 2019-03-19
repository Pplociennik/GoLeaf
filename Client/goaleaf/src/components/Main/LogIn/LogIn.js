import React, { Component } from 'react'
import styles from './LogIn.module.scss'
import { Link } from 'react-router-dom'

class LogIn extends Component {

  state = {
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
      <div className={styles.LogIn}>
      <form onSubmit={ this.handleSubmit }>
        <h1> Log In </h1>
        <label>
          login 
          <input className={styles.InputField} type="text" id="login" onChange={ this.handleChange } />
        </label>
        <label>
          password 
          <input className={styles.InputField} type="password" id="password" onChange={ this.handleChange } />
        </label>
          <div className={styles.Buttons}>
            <input type="submit" value="log in" />
            <Link to='/signin'><input type="button" value="sign in" /></Link>
          </div>
      </form>
      </div>
    )
  }
}

export default LogIn;
