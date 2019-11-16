import React, { Component } from 'react'
import './MyHabits.scss'
import axios from 'axios'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import HabitCard from './../../routes/HabitCard/HabitCard'

class MyHabits extends Component {

  state = {
    habitCardsFinished: [],
    habitCardsUnfinished: [],
    habitCardsWon: [],
    habitsToShow: 20,
    habitsSortBy: 'NEWEST'
  }

  handleHabitCardClicked = id => {
    this.props.history.push(`/habit/${id}`);
  }

  handleFilter = e => {
    if (this.state.category !== e.currentTarget.value) {
      this.setState({ category: e.currentTarget.value, habitsToShow: 20 })
    }
  }

  componentDidMount() {
    // this.setState({ habitCards: this.props.habits })
    console.log(this.props.userLogged)
    axios.get(`/api/users/myFinishedHabits?userID=${this.props.userLogged}`)
    .then(res => {
        this.setState({
          habitCardsFinished: res.data
        })
    }).catch(err => console.log(err.response.data.message))

    axios.get(`/api/users/myUnfinishedHabits?userID=${this.props.userLogged}`)
    .then(res => {
        this.setState({
          habitCardsUnfinished: res.data
        })
    }).catch(err => console.log(err.response.data.message))

    axios.get(`/api/users/myWonHabits?userID=${this.props.userLogged}`)
    .then(res => {
        this.setState({
          habitCardsWon: res.data
        })
    }).catch(err => console.log(err.response.data.message))
  }

  render() {

    let habitCardsUnfinished = this.state.habitCardsUnfinished;
    let habitCardsFinished = this.state.habitCardsFinished;
    let habitCardsWon = this.state.habitCardsWon;

    // habitCards = habitCards.filter(habitCard => habitCard.members.includes(this.props.userLogged));

    habitCardsUnfinished.sort(function (a, b) {
      let keyA = new Date(a.startDate),
        keyB = new Date(b.startDate);
      if (keyA > keyB) return -1;
      if (keyA < keyB) return 1;
      return 0;
    });
    habitCardsFinished.sort(function (a, b) {
      let keyA = new Date(a.startDate),
        keyB = new Date(b.startDate);
      if (keyA > keyB) return -1;
      if (keyA < keyB) return 1;
      return 0;
    });
    habitCardsWon.sort(function (a, b) {
      let keyA = new Date(a.startDate),
        keyB = new Date(b.startDate);
      if (keyA > keyB) return -1;
      if (keyA < keyB) return 1;
      return 0;
    });


    let foundUnfinishedHabits = false;
    let habitsUnfinished = []
    habitCardsUnfinished.forEach(habit => {
      foundUnfinishedHabits = true;
      habitsUnfinished.push(<HabitCard key={habit.id} id={habit.id} title={habit.title} category={habit.category} frequency={habit.frequency} startedOn={habit.startDate} private={habit.isPrivate} login={habit.creatorLogin} membersNumber={habit.membersCount} habitCardClicked={this.handleHabitCardClicked} />)

    })

    let habitsUnfinishedToDisplay = habitsUnfinished.slice(0, this.state.habitsToShow);



    let foundFinishedHabits = false;
    let habitsFinished = []
    habitCardsFinished.forEach(habit => {
      foundFinishedHabits = true;
      habitsFinished.push(<HabitCard key={habit.id} id={habit.id} title={habit.title} category={habit.category} frequency={habit.frequency} startedOn={habit.startDate} private={habit.isPrivate} login={habit.creatorLogin} membersNumber={habit.membersCount} habitCardClicked={this.handleHabitCardClicked} />)

    })

    let habitsFinishedToDisplay = habitsFinished.slice(0, this.state.habitsToShow);



    let foundWonHabits = false;
    let habitsWon = []
    habitCardsWon.forEach(habit => {
      foundWonHabits = true;
      habitsWon.push(<HabitCard key={habit.id} id={habit.id} title={habit.title} category={habit.category} frequency={habit.frequency} startedOn={habit.startDate} private={habit.isPrivate} login={habit.creatorLogin} membersNumber={habit.membersCount} habitCardClicked={this.handleHabitCardClicked} />)

    })

    let habitsWonToDisplay = habitsWon.slice(0, this.state.habitsToShow);


    if (!foundUnfinishedHabits) {
      habitsUnfinishedToDisplay = <div className="no-habits"> Join some challenges to see them here</div>
    }
    if (!foundFinishedHabits) {
      habitsFinishedToDisplay = <div className="no-habits"> You haven't finished any challenges yet</div>
    }
    if (!foundWonHabits) {
      habitsWonToDisplay = <div className="no-habits"> You haven't won any challenges yet</div>
    }

    // console.log(habitsToDisplay.length);
    // console.log(habits.length);

    if (localStorage.getItem('token')) {
      return (
        <div>
        {foundUnfinishedHabits ?
        <section className="my-habits">
          <h1 className="my-habits-title" >My active challenges</h1>

          <div className="habit-cards">
            {habitsUnfinishedToDisplay}
          </div>
          <button className={habitsUnfinishedToDisplay.length < habitsUnfinished.length ? 'my-habits-show-more-habits-btn' : 'my-habits-hide-show-more-habits-btn'} onClick={() => this.setState({ habitsToShow: this.state.habitsToShow + 20 })}>SHOW MORE</button>
        </section> : null}
        {foundFinishedHabits ?
        <section className="my-habits">
          <h1 className="my-habits-title" >My ended challenges</h1>

          <div className="habit-cards">
            {habitsFinishedToDisplay}
          </div>
          <button className={habitsFinishedToDisplay.length < habitsFinished.length ? 'my-habits-show-more-habits-btn' : 'my-habits-hide-show-more-habits-btn'} onClick={() => this.setState({ habitsToShow: this.state.habitsToShow + 20 })}>SHOW MORE</button>
        </section> : null}
        {foundWonHabits ?
        <section className="my-habits">
          <h1 className="my-habits-title" >My won challenges</h1>

          <div className="habit-cards">
            {habitsWonToDisplay}
          </div>
          <button className={habitsWonToDisplay.length < habitsWon.length ? 'my-habits-show-more-habits-btn' : 'my-habits-hide-show-more-habits-btn'} onClick={() => this.setState({ habitsToShow: this.state.habitsToShow + 20 })}>SHOW MORE</button>
        </section> : null}
        </div>
      )
    } else {
      return null
    }
  }
}

const mapStateToProps = state => {
  return {
    habits: state.habits,
    users: state.users,
    members: state.members,
    userLogged: state.userLogged

  }
}

export default withRouter(connect(mapStateToProps)(MyHabits));