import React, { Component } from 'react'
import styles from './LogIn.module.scss'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'

class LogIn extends Component {

  state = {
    login: null,
    password: null,
    errorMsg: null
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
    .then(res => {console.log("User succesfully logged in");
                  localStorage.setItem('token', res.data);
                  window.location.reload();
                  this.props.history.push('/');
                }
    ).catch(err => {this.setState({error: true}); console.log(err)})
  }
  render() {
    if(this.props.authenticated){
      return (
        <div className={styles.LoggedMsg}>
          <h1>user already logged in</h1>
        </div>
      )
    }
    let errorMsg = null
    if (this.state.error) {
      errorMsg = <div className={styles.Error}>Log In unsuccessful, please try again</div>
    }
    return (
      <div className={styles.LogIn}>
      <form onSubmit={ this.handleSubmit } autoComplete="off">
        <h1> Log In </h1>
        <label>
          login 
          <input className={styles.InputField} type="text" id="login" onChange={ this.handleChange } />
        </label>
        <label>
          password 
          <input className={styles.InputField} type="password" id="password" onChange={ this.handleChange } />
        </label>
        { errorMsg }
          <div className={styles.Buttons}>
            <input type="submit" value="Log in" />
            <Link to='/signin'><input type="button" value="Sign in" /></Link>
          </div>
      </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.authenticated
  }
}
const mapDispatchToProps = dispatch => {
  return {
    
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
