import React, { Component } from 'react'
import './MyHabits.scss'
import Habits from './Habits/Habits'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchFinishedHabits } from './../../../js/state';
import { fetchUnfinishedHabits } from './../../../js/state';
import { fetchWonHabits } from './../../../js/state';
import ReactPaginate from 'react-paginate';
import LoaderSmall from './../../routes/LoaderSmall/LoaderSmall'
import axios from 'axios'

class MyHabits extends Component {

  state = {
    habitsToShow: 16,

    usersAll: 0,
    publicChallengesAll: 0,
    privateChallengesAll: 0,
    endedChallengesAll: 0,
    createdTasksAll: 0,
    completedTasksAll: 0,
    createdPostsAll: 0,
    createdCommentsAll: 0,
    statsLoading: true
  }

  handleUnfinishedHabitsPageClick = data => {
    this.props.fetchUnfinishedHabits(data.selected, this.state.habitsToShow, localStorage.getItem('token'));
  }
  handleFinishedHabitsPageClick = data => {
    this.props.fetchFinishedHabits(data.selected, this.state.habitsToShow, localStorage.getItem('token'));
  }
  handleWonHabitsPageClick = data => {
    this.props.fetchWonHabits(data.selected, this.state.habitsToShow, localStorage.getItem('token'));
  }

  componentDidMount() {
        this.props.fetchFinishedHabits(0, this.state.habitsToShow, localStorage.getItem('token'));
        this.props.fetchUnfinishedHabits(0, this.state.habitsToShow, localStorage.getItem('token'));
        this.props.fetchWonHabits(0, this.state.habitsToShow, localStorage.getItem('token'));

        if(this.props.userLoggedLogin === "GoaleafAdmin"){
          axios.get("http://localhost:8081/api/stats/counts")
          .then(res => {
              this.setState({
                  usersAll: res.data.users,
                  publicChallengesAll: res.data.publicHabits,
                  privateChallengesAll: res.data.privateHabits,
                  endedChallengesAll: res.data.stats.finishedChallenges,
                  createdTasksAll: res.data.stats.createdTasks,
                  completedTasksAll: res.data.stats.completedTasks,
                  createdPostsAll: res.data.stats.createdPosts,
                  createdCommentsAll: res.data.stats.commentedPosts,
                  statsLoading: false
              })
          }
          ).catch(err => {console.log("Stats couldn't be loaded");})
        }
  }

  render() {
    if (localStorage.getItem('token')) {
      return (
        <div>
          { this.props.userLoggedLogin === "GoaleafAdmin" ?
          <section className="my-habits">
            <h1 className="my-habits-title" >Stats</h1>
            {!this.state.statsLoading ?
              <div className="stats-grid">
                <div className="stats-block">
                  <div className="stats-number-con">
                    <span className="stats-number">{this.state.usersAll}</span>
                  </div>
                  <div className="stats-label-con">
                    <span className="stats-label"><span role="img" aria-label="icon">👨‍👨‍👦‍👦</span> users</span>
                  </div>
                </div>
                <div className="stats-block">
                  <div className="stats-number-con">
                    <span className="stats-number">{this.state.publicChallengesAll}</span>
                  </div>
                  <div className="stats-label-con">
                    <span className="stats-label"><span role="img" aria-label="icon">🎈</span> public challenges</span>
                  </div>
                </div>
                <div className="stats-block">
                  <div className="stats-number-con">
                    <span className="stats-number">{this.state.privateChallengesAll}</span>
                  </div>
                  <div className="stats-label-con">
                    <span className="stats-label"><span role="img" aria-label="icon">⛔</span> private challenges</span>
                  </div>
                </div>
                <div className="stats-block">
                  <div className="stats-number-con">
                    <span className="stats-number">{this.state.endedChallengesAll}</span>
                  </div>
                  <div className="stats-label-con">
                    <span className="stats-label"><span role="img" aria-label="icon">🏆</span> ended challenges</span>
                  </div>
                </div>
                <div className="stats-block">
                  <div className="stats-number-con">
                    <span className="stats-number">{this.state.createdTasksAll}</span>
                  </div>
                  <div className="stats-label-con">
                    <span className="stats-label"><span role="img" aria-label="icon">🔥</span> created tasks</span>
                  </div>
                </div>
                <div className="stats-block">
                  <div className="stats-number-con">
                    <span className="stats-number">{this.state.completedTasksAll}</span>
                  </div>
                  <div className="stats-label-con">
                    <span className="stats-label"><span role="img" aria-label="icon">✅</span> completed tasks</span>
                  </div>
                </div>
                <div className="stats-block">
                  <div className="stats-number-con">
                    <span className="stats-number">{this.state.createdPostsAll}</span>
                  </div>
                  <div className="stats-label-con">
                    <span className="stats-label"><span role="img" aria-label="icon">📘</span> created posts</span>
                  </div>
                </div>
                <div className="stats-block">
                  <div className="stats-number-con">
                    <span className="stats-number">{this.state.createdCommentsAll}</span>
                  </div>
                  <div className="stats-label-con">
                    <span className="stats-label"><span role="img" aria-label="icon">📝</span> created comments</span>
                  </div>
                </div>
              </div>
            : <LoaderSmall/>}
          </section> : null }

        <section className="my-habits">
          <h1 className="my-habits-title" >My active challenges</h1>
          {!this.props.unfinishedHabitsLoading ?
            <Habits habitCards={this.props.unfinishedHabits} status="active" />
          : <LoaderSmall/>}


          {this.props.unfinishedHabitsPages > 1 ?
                        <ReactPaginate
                            previousLabel={'previous'}
                            nextLabel={'next'}
                            breakLabel={'...'}
                            breakClassName={'break-me'}
                            pageCount={this.props.unfinishedHabitsPages}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.handleUnfinishedHabitsPageClick}
                            containerClassName={'pagination'}
                            subContainerClassName={'pages-pagination'}
                            activeClassName={'active-pagination'}
                            pageClassName={'page-pagination'}
                        /> : null}
        </section>
        { this.props.wonHabits.length > 0 ?
          <section className="my-habits">
            <h1 className="my-habits-title" >My won challenges</h1>
            {!this.props.wonHabitsLoading ?
              <Habits habitCards={this.props.wonHabits} status="won" />
            : <LoaderSmall/>}
            {this.props.wonHabitsPages > 1 ?
                        <ReactPaginate
                            previousLabel={'previous'}
                            nextLabel={'next'}
                            breakLabel={'...'}
                            breakClassName={'break-me'}
                            pageCount={this.props.wonHabitsPages}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.handleWonHabitsPageClick}
                            containerClassName={'pagination'}
                            subContainerClassName={'pages-pagination'}
                            activeClassName={'active-pagination'}
                            pageClassName={'page-pagination'}
                        /> : null}
          </section> : null }
        { this.props.finishedHabits.length > 0 ?
        <section className="my-habits">
          <h1 className="my-habits-title" >My ended challenges</h1>
          {!this.props.finishedHabitsLoading ?
            <Habits habitCards={this.props.finishedHabits} status="ended" />
          : <LoaderSmall/>}
          {this.props.finishedHabitsPages > 1 ?
                        <ReactPaginate
                            previousLabel={'previous'}
                            nextLabel={'next'}
                            breakLabel={'...'}
                            breakClassName={'break-me'}
                            pageCount={this.props.finishedHabitsPages}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.handleFinishedHabitsPageClick}
                            containerClassName={'pagination'}
                            subContainerClassName={'pages-pagination'}
                            activeClassName={'active-pagination'}
                            pageClassName={'page-pagination'}
                        /> : null}
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

    finishedHabitsPages: state.finishedHabitsPages,
    unfinishedHabitsPages: state.unfinishedHabitsPages,
    wonHabitsPages: state.wonHabitsPages,

    finishedHabitsLoading: state.unfinishedHabitsLoading,
    unfinishedHabitsLoading: state.unfinishedHabitsLoading,
    wonHabitsLoading: state.unfinishedHabitsLoading,


    userLogged: state.userLogged,
    userLoggedLogin: state.userLoggedLogin

  }
}
const mapDispatchToProps = dispatch => ({
  fetchFinishedHabits: (page, toShow, token) => dispatch(fetchFinishedHabits(page, toShow, token)),
  fetchUnfinishedHabits: (page, toShow, token) => dispatch(fetchUnfinishedHabits(page, toShow, token)),
  fetchWonHabits: (page, toShow, token) => dispatch(fetchWonHabits(page, toShow, token)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyHabits));