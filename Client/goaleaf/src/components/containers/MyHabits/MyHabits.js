import React, { Component } from 'react'
import './MyHabits.scss'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import HabitCard from './../../routes/HabitCard/HabitCard'

class MyHabits extends Component {

  state = {
      category: "ALL",
      habitCards: [],
      habitsToShow: 20,
      habitsSortBy: 'NEWEST'
  }

  handleHabitCardClicked = id => {
    this.props.history.push(`/habit/${id}`);
  }
  
  handleFilter = e => {
    if(this.state.category !== e.currentTarget.value){
      this.setState({category: e.currentTarget.value, habitsToShow: 20})
    }
  }

 componentDidMount() {
    this.setState({habitCards: this.props.habits})
  } 

  render() {

    let habitCards = [];
    this.props.habits.forEach(habit => {
      habit.members = [];
      this.props.members.forEach(member => {
        if(habit.id === member.habitID){
          habit.members.push(member.userID)
        }
      })
      this.props.users.forEach(user => {
        if(habit.creatorID === user.id){
          habit.ownerLogin = user.login;
          habitCards.push(habit)
        }
      })
    })

    habitCards = habitCards.filter(habitCard => habitCard.members.includes(this.props.userLogged));

    console.log(habitCards);

    habitCards.sort(function(a, b){
      let keyA = new Date(a.habitStartDate),
          keyB = new Date(b.habitStartDate);
      if(keyA > keyB) return -1;
      if(keyA < keyB) return 1;
      return 0;
  });


      let foundHabits = false;
      let habits = []
      habitCards.forEach(habit => {

          if(!habit.private && (this.state.category === 'ALL' || habit.category === this.state.category)){
            foundHabits = true;
          habits.push(<HabitCard key={ habit.id } id={ habit.id } title={ habit.habitTitle } category={ habit.category } frequency={ habit.frequency } startedOn={ habit.habitStartDate } private={ habit.private } login={habit.ownerLogin} membersNumber={habit.members.length} habitCardClicked={ this.handleHabitCardClicked } />)
          }
      })

        let habitsToDisplay = habits.slice(0, this.state.habitsToShow);


      if(!foundHabits){
     habitsToDisplay = <div className="no-habits"> Join some habits to see them here</div>
      }


    if (localStorage.getItem('token')){
    return (
      <section className="my-habits">
      <h1 className="my-habits-title" >My habits</h1>

      <div className="habit-cards">
          { habitsToDisplay }
      </div>
      <button className={habitsToDisplay.length < habits.length ? 'show-more-habits-btn' : 'hide-show-more-habits-btn'} onClick={() => this.setState({habitsToShow: this.state.habitsToShow + 5})}>SHOW MORE</button>
      </section>
    )} else {
      return null;
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