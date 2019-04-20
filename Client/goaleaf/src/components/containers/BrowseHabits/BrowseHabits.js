import React, { Component } from 'react'
import './BrowseHabits.scss'
import { connect } from 'react-redux';
import HabitCard from './../../routes/HabitCard/HabitCard'
import axios from 'axios';

class BrowseHabits extends Component {

  state = {
      category: "ALL",
      habitCards: []
  }

  handleFilter = e => {
    this.setState({category: e.target.value})
  }

  componentDidMount() {
    this.setState({habitCards: this.props.habits})
  }

  render() {
    let habitCards = [];
    this.props.habits.forEach(habit => {
      this.props.users.forEach(user => {
        if(habit.creatorID === user.id){
          habit.ownerLogin = user.login;
          habit.ownerImg = user.imageName
          habitCards.push(habit)
        }
      })
    })

      let foundHabits = false;
      let habits = habitCards.map(habit => {

          if(!habit.private && (this.state.category === 'ALL' || habit.category === this.state.category)){
            foundHabits = true;
          return <HabitCard key={ habit.id } title={ habit.habitTitle } category={ habit.category } frequency={ habit.frequency } startedOn={ habit.habitStartDate } login={habit.ownerLogin}/>
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
    habits: state.habits,
    users: state.users

  }
}

export default connect(mapStateToProps)(BrowseHabits);