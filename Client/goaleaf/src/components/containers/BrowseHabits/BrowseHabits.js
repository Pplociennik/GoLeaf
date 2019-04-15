import React, { Component } from 'react'
import './BrowseHabits.scss'
import { connect } from 'react-redux';

class BrowseHabits extends Component {

  state = {
      habitsToShow: []

  }

  render() {
      let habits = this.props.habits.map(habit => 
          <div className="habit-card"  category={habit.category} key={habit.id}>
            <h1>{ habit.habitTitle }</h1>
            <span>{ habit.habitStartDate } </span>
          </div>
      )
    return (
      <section className="BrowseHabits">
      <h1>Browse habits</h1>
      <div>
          navigation
      </div>
      <div>
          {habits}
      </div>
      </section>
    )
  } 
}

const mapStateToProps = state => {
  return {
    habits: state.habits
  }
}

export default connect(mapStateToProps)(BrowseHabits);