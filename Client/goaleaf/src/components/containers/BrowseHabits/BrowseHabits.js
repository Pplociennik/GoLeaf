import React, { Component } from 'react'
import './BrowseHabits.scss'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import HabitCard from './../../routes/HabitCard/HabitCard'
import { fetchHabits } from './../../../js/state';
import ReactPaginate from 'react-paginate';

class BrowseHabits extends Component {

  state = {
      habitCards: [],
      category: "ALL",
      habitsSortBy: 'Newest',
      habitsToShow: 16,
      pageNr: 0
  }

  handleHabitCardClicked = id => {
    this.props.history.push(`/challenge/${id}`);
  }
  
  handleFilter = e => {
    this.setState({category: e.currentTarget.value});
    this.props.fetchHabits(0, this.state.habitsToShow, e.currentTarget.value, this.state.habitsSortBy);
  }

  handleSort = e => {
    this.setState({habitsSortBy: e.currentTarget.value});
    this.props.fetchHabits(0, this.state.habitsToShow, e.currentTarget.value, e.currentTarget.value);
  }



  handlePageClick = data => {
    this.setState({pageNr: data.selected});
    this.props.fetchHabits(data.selected, this.state.habitsToShow, this.state.category, this.state.habitsSortBy);
  }
  componentDidMount(){
    this.props.fetchHabits(this.state.pageNr, this.state.habitsToShow, this.state.category, this.state.habitsSortBy);
  }

  render() {
    let habitCards = this.props.habits;

      let foundHabits = false;
      let habits = []
      habitCards.forEach(habit => {
        foundHabits = true;
        habits.push(<HabitCard key={ habit.id } id={ habit.id } title={ habit.title } category={ habit.category } frequency={ habit.frequency } startedOn={ habit.startDate } private={ habit.isPrivate } login={habit.creatorLogin} membersNumber={habit.membersCount} habitCardClicked={ this.handleHabitCardClicked } />)
      })

        let habitsToDisplay = habits;


      if(!foundHabits){
        habitsToDisplay = <div className="no-habits"> No challenges were found</div>
      }


    return (
      <section className="browse-habits">
      <h1 className="browse-habits-title" >Browse challenges</h1>
      <div className="browse-habits-navigation">
        <div className="browse-habits-navigation-filters">
            <button className={this.state.category === 'ALL' ? 'category all-chosen all' : ' category all'} value="ALL" onClick={ this.handleFilter }>all</button>
            <button className={this.state.category === 'NONE' ? 'category none-chosen none' : ' category none'} value="NONE" onClick={ this.handleFilter }><i className="fas fa-minus fa-lg"></i></button>
            <button className={this.state.category === 'DIET' ? 'category diet-chosen diet' : 'category diet'} value="DIET" onClick={ this.handleFilter }><i className="fas fa-carrot fa-lg"></i></button>
            <button className={this.state.category === 'SPORT' ? 'category sport-chosen sport' : 'category sport'} value="SPORT" onClick={ this.handleFilter }><i className="fas fa-running fa-lg"></i></button>  
            <button className={this.state.category === 'HEALTH' ? 'category health-chosen health' : 'category health'} value="HEALTH" onClick={ this.handleFilter }><i className="fas fa-heartbeat fa-lg"></i></button>
            <button className={this.state.category === 'STUDY' ? 'category study-chosen study' : 'category study'} value="STUDY" onClick={ this.handleFilter }><i className="fas fa-book fa-lg"></i></button>
            <button className={this.state.category === 'WORK' ? 'category work-chosen work' : 'category work'} value="WORK" onClick={ this.handleFilter }><i className="fas fa-briefcase fa-lg"></i></button>
            <button className={this.state.category === 'MONEY' ? 'category money-chosen money' : 'category money'} value="MONEY" onClick={ this.handleFilter }><i className="fas fa-money-bill-alt fa-lg"></i></button>
            <button className={this.state.category === 'SOCIAL' ? 'category social-chosen social' : 'category social'} value="SOCIAL" onClick={ this.handleFilter }><i className="fas fa-heart fa-lg"></i></button>
            <button className={this.state.category === 'FAMILY' ? 'category family-chosen family' : 'category family'} value="FAMILY" onClick={ this.handleFilter }><i className="fas fa-home fa-lg"></i></button>
        </div>
        <div className="browse-habits-navigation-sorting">
          <button className={this.state.habitsSortBy === 'Newest' ? "habit-cards-sort-btn active-habit-cards-sort-btn" : "habit-cards-sort-btn inactive-habit-cards-sort-btn"} value="Newest" onClick={ this.handleSort }><i className="far fa-calendar-alt"></i> NEWEST</button>
          <button className={this.state.habitsSortBy === 'Popular' ? "habit-cards-sort-btn active-habit-cards-sort-btn" : "habit-cards-sort-btn inactive-habit-cards-sort-btn"} value="Popular" onClick={ this.handleSort }><i className="fas fa-user-friends"></i> POPULAR</button>
        </div>      
      </div>
      <div className="habit-cards">
          { habitsToDisplay }
      </div>
      {this.props.habitsAllPages > 1 ? 
      <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={this.props.habitsAllPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages-pagination'}
          activeClassName={'active-pagination'}
          pageClassName={'page-pagination'}
        /> : null }
      </section>
    )
  }   
}

const mapStateToProps = state => {
  return {
    habits: state.habits,
    habitsAllPages: state.habitsAllPages,
    habitsPage: state.habitsPage,
    userLogged: state.userLogged
  }
}
const mapDispatchToProps = dispatch => ({
  fetchHabits: (pageNr, objectsNr, category, sorting) => dispatch(fetchHabits(pageNr, objectsNr, category, sorting))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BrowseHabits));