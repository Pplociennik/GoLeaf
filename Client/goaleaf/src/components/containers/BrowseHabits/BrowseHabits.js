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
    this.setState({category: e.currentTarget.value})
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

    habitCards.sort(function(a, b){
      let keyA = new Date(a.habitStartDate),
          keyB = new Date(b.habitStartDate);
      // Compare the 2 dates
      if(keyA > keyB) return -1;
      if(keyA < keyB) return 1;
      return 0;
  });

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
            <button className={this.state.category === 'ALL' ? 'category all-chosen all' : ' category all'} value="ALL" onClick={ this.handleFilter }>all</button>
            <button className={this.state.category === 'NONE' ? 'category none-chosen none' : ' category none'} value="NONE" title="NONE" onClick={ this.handleFilter }><i className="fas fa-minus fa-lg"></i></button>
            <button className={this.state.category === 'DIET' ? 'category diet-chosen diet' : 'category diet'} value="DIET" title="DIET" onClick={ this.handleFilter }><i className="fas fa-carrot fa-lg"></i></button>
            <button className={this.state.category === 'SPORT' ? 'category sport-chosen sport' : 'category sport'} value="SPORT" title="SPORT" onClick={ this.handleFilter }><i className="fas fa-running fa-lg"></i></button>  
            <button className={this.state.category === 'HEALTH' ? 'category health-chosen health' : 'category health'} value="HEALTH" title="HEALTH" onClick={ this.handleFilter }><i className="fas fa-heartbeat fa-lg"></i></button>
            <button className={this.state.category === 'STUDY' ? 'category study-chosen study' : 'category study'} value="STUDY" title="STUDY" onClick={ this.handleFilter }><i className="fas fa-book fa-lg"></i></button>
            <button className={this.state.category === 'WORK' ? 'category work-chosen work' : 'category work'} value="WORK" title="WORK" onClick={ this.handleFilter }><i className="fas fa-briefcase fa-lg"></i></button>
            <button className={this.state.category === 'MONEY' ? 'category money-chosen money' : 'category money'} value="MONEY" title="MONEY" onClick={ this.handleFilter }><i className="fas fa-money-bill-alt fa-lg"></i></button>
            <button className={this.state.category === 'SOCIAL' ? 'category social-chosen social' : 'category social'} value="SOCIAL" title="SOCIAL" onClick={ this.handleFilter }><i className="fas fa-heart fa-lg"></i></button>
            <button className={this.state.category === 'FAMILY' ? 'category family-chosen family' : 'category family'} value="FAMILY" title="FAMILY" onClick={ this.handleFilter }><i className="fas fa-home fa-lg"></i></button>
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