import React, { Component } from 'react'
import './Dashboard.scss'
import { connect } from 'react-redux'

class Dashboard extends Component {
  render() {
    let user = <div>user not logged</div>
    if(this.props.authenticated) {
      user = <div>user logged!</div>
    }
    return (
      <div className="Dashboard">
        { user }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.authenticated,
    userLogged: state.userLogged
  }
}

export default connect(mapStateToProps)(Dashboard);
