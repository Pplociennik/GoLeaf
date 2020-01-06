import React, { Component } from 'react'
import './MyHabits.scss'
import axios from 'axios'
import Habits from './Habits/Habits'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import HabitCard from './../../routes/HabitCard/HabitCard'
import { fetchFinishedHabits } from './../../../js/state';
import { fetchUnfinishedHabits } from './../../../js/state';
import { fetchWonHabits } from './../../../js/state';

class MyHabits extends Component {

  componentDidMount() {
        this.props.fetchFinishedHabits(this.props.userLogged);
        this.props.fetchUnfinishedHabits(this.props.userLogged);
        this.props.fetchWonHabits(this.props.userLogged);
  }

  render() {
    if (localStorage.getItem('token')) {
      return (
        <div>
        <section className="my-habits">
          <h1 className="my-habits-title" >My active challenges</h1>
          <Habits habitCards={this.props.unfinishedHabits} status="active" />
        </section>
        { this.props.wonHabits.length > 0 ?
          <section className="my-habits">
            <h1 className="my-habits-title" >My won challenges</h1>
            <Habits habitCards={this.props.wonHabits} status="won" />
          </section> : null }
        { this.props.finishedHabits.length > 0 ?
        <section className="my-habits">
          <h1 className="my-habits-title" >My ended challenges</h1>
          <Habits habitCards={this.state.finishedHabits} status="ended" />
        </section> : null }
        </div>
      )
    } else {
      return null
    }
  }
}

const mapStateToProps = state => {
  return {
    finishedHabits: state.finishedHabits,
    unfinishedHabits: state.unfinishedHabits,
    wonHabits: state.wonHabits,
    userLogged: state.userLogged

  }
}
const mapDispatchToProps = dispatch => ({
  fetchFinishedHabits: userID => dispatch(fetchFinishedHabits(userID)),
  fetchUnfinishedHabits: userID => dispatch(fetchUnfinishedHabits(userID)),
  fetchWonHabits: userID => dispatch(fetchWonHabits(userID)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyHabits));