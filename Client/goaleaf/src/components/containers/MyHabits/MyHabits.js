import React, { Component } from 'react'
import './MyHabits.scss'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import HabitCard from './../../routes/HabitCard/HabitCard'
import Notifications from '../../routes/Notifications/Notifications'

class MyHabits extends Component {

  state = {
    habitCards: [],
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
    this.setState({ habitCards: this.props.habits })
  }

  render() {

    let habitCards = this.props.habits;

    habitCards = habitCards.filter(habitCard => habitCard.members.includes(this.props.userLogged));

    habitCards.sort(function (a, b) {
      let keyA = new Date(a.habitStartDate),
        keyB = new Date(b.habitStartDate);
      if (keyA > keyB) return -1;
      if (keyA < keyB) return 1;
      return 0;
    });


    let foundHabits = false;
    let habits = []
    habitCards.forEach(habit => {
      foundHabits = true;
      habits.push(<HabitCard key={habit.id} id={habit.id} title={habit.habitTitle} category={habit.category} frequency={habit.frequency} startedOn={habit.habitStartDate} private={habit.private} login={habit.owner.login} membersNumber={habit.members.length} habitCardClicked={this.handleHabitCardClicked} />)

    })

    let habitsToDisplay = habits.slice(0, this.state.habitsToShow);


    if (!foundHabits) {
      habitsToDisplay = <div className="no-habits"> Join some habits to see them here</div>
    }

    console.log(habitsToDisplay.length);
    console.log(habits.length);

    if (localStorage.getItem('token') && foundHabits) {
      return (
        <section className="my-habits">
          <h1 className="my-habits-title" >My habits</h1>

          <div className="habit-cards">
            {habitsToDisplay}
          </div>
          <button className={habitsToDisplay.length < habits.length ? 'my-habits-show-more-habits-btn' : 'my-habits-hide-show-more-habits-btn'} onClick={() => this.setState({ habitsToShow: this.state.habitsToShow + 20 })}>SHOW MORE</button>
          <div>
            <Notifications />
          </div>
        </section>
      )
    } else {
      return (
        <section>
          <div>
            <Notifications />
          </div>
        </section>
      );
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