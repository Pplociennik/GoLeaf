import React, { Component } from 'react'
import styles from './LogIn.module.scss'
import { Link } from 'react-router-dom'
import axios from 'axios'

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
    axios.post(`http://localhost:8080/login`, {
      "Token": "",
      "login": this.state.login,
      "password": this.state.password
    })
    .then(res => {console.log("User succesfully logged in", res);

    if(res.status === 200){
      localStorage.setItem('token', res.data);
      this.props.history.push('/');
      window.location.reload();
    } else {
      const error = new Error(res.error);
      throw error;
    }}
    )
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
            <input type="submit" value="Log in" />
            <Link to='/signin'><input type="button" value="Sign in" /></Link>
          </div>
      </form>
      </div>
    )
  }
}

export default LogIn;
