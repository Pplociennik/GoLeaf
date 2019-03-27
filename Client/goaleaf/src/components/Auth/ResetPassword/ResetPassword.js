import React, { Component } from 'react'
import styles from './ResetPassword.module.scss'
import { Link } from 'react-router-dom'
import axios from 'axios'

class ResetPassword extends Component {

  state = {
    email: null,
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = e => {
    e.preventDefault();
    // TODO
  }

  render() {
    let errorMsg = null
    if (this.state.error) {
      errorMsg = <div className={styles.Error}>no user with such email</div>
    }
    return (
      <div className={styles.ResetPassword}>
      <form onSubmit={ this.handleSubmit } autoComplete="off">
        <h1> Reset password </h1>
        <label>
          email 
          <input className={styles.InputField} type="email" id="email" onChange={ this.handleChange } />
        </label>
        { errorMsg }
          <div className={styles.Buttons}>
            <input type="submit" value="Submit" />
          </div>
      </form>
      </div>
    )
  }
}

export default ResetPassword;
