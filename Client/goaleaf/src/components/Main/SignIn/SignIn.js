import React, { Component } from 'react'
import styles from './SignIn.module.scss'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'

class SignIn extends Component {

  state = {
    login: null,
    email: null,
    password: null,
    error: false
  }
  handleChange = e => {
    this.setState({[e.target.id]: e.target.value})
  }
  handleSubmit = e => {
    e.preventDefault();
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
       }).catch(err => this.setState({error: true}));
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
      errorMsg = <div className={styles.Error}>Sign in unsuccessful, please try again</div>
    }
    return (
      <div className={styles.SignIn}>
      <form onSubmit={ this.handleSubmit } autoComplete="off">
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
        { errorMsg }
          <div className={styles.Buttons}>
            <input type="submit" value="Sign in" />
            <Link to='/login'><input type="button" value="Log in" /></Link>
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
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
