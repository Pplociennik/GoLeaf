import React, { Component } from 'react'
import './Dashboard.scss'
import { connect } from 'react-redux'
import BrowseHabits from './../BrowseHabits/BrowseHabits'
import MyHabits from './../MyHabits/MyHabits'

class Dashboard extends Component {
  render() {

    return (
      <div className="dashboard">
        <MyHabits />
        <BrowseHabits />
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
