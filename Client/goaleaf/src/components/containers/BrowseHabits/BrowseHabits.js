import React, { Component } from 'react'
import './BrowseHabits.scss'
import { connect } from 'react-redux';
import HabitCard from './../../routes/HabitCard/HabitCard'
import axios from 'axios';

class BrowseHabits extends Component {

  state = {
      habitsToShow: [],
      category: "ALL"
  }

  handleFilter = e => {
    this.setState({category: e.target.value})
  }

  render() {
      console.log(this.props.habits)
      let foundHabits = false;
      let habits = this.props.habits.map(habit => {

          if(!habit.private && (this.state.category === 'ALL' || habit.category === this.state.category)){
            foundHabits = true;
          return <HabitCard key={ habit.id } title={ habit.habitTitle } category={ habit.category }/>
          }
      })
      if(!foundHabits){
     habits = <div className="no-habits"> No habits were found</div>
      }
      

    return (
      <section className="browse-habits">
      <h1 className="browse-habits-title" >Browse habits</h1>
      <div className="browse-habits-navigation">
            <input className={this.state.category === 'ALL' ? 'category all-chosen all' : ' category all'} type="button" value="ALL" onClick={ this.handleFilter } />
            <input className={this.state.category === 'NONE' ? 'category none-chosen none' : ' category none'} type="button" value="NONE" onClick={ this.handleFilter } />
            <input className={this.state.category === 'DIET' ? 'category diet-chosen diet' : 'category diet'} type="button" value="DIET" onClick={ this.handleFilter }/>
            <input className={this.state.category === 'SPORT' ? 'category sport-chosen sport' : 'category sport'} type="button" value="SPORT" onClick={ this.handleFilter }/>
            <input className={this.state.category === 'HEALTH' ? 'category health-chosen health' : 'category health'} type="button" value="HEALTH" onClick={ this.handleFilter }/>
            <input className={this.state.category === 'SOCIAL' ? 'category social-chosen social' : 'category social'} type="button" value="SOCIAL" onClick={ this.handleFilter }/>
            <input className={this.state.category === 'FAMILY' ? 'category family-chosen family' : 'category family'} type="button" value="FAMILY" onClick={ this.handleFilter }/>
            <input className={this.state.category === 'STUDY' ? 'category study-chosen study' : 'category study'} type="button" value="STUDY" onClick={ this.handleFilter }/>
            <input className={this.state.category === 'WORK' ? 'category work-chosen work' : 'category work'} type="button" value="WORK" onClick={ this.handleFilter }/>
            <input className={this.state.category === 'MONEY' ? 'category money-chosen money' : 'category money'} type="button" value="MONEY" onClick={ this.handleFilter }/>
      </div>
      <div className="habit-cards">
          { habits }
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