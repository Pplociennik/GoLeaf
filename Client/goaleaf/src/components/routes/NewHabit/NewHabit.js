import React, { Component } from 'react'
import './NewHabit.scss'
import { connect } from 'react-redux';

class NewHabit extends Component {

  state = {
    title: '',
    startsOn: new Date(),
    category: 'NONE',
    invite: [],
    private: false,
    recurrence: 'daily'
  }
  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state)
  }
  handleChange = e => {
    this.setState({[e.target.id]: e.target.value})
  }

  handleChangeCategory = e => {
    this.setState({category: e.target.value})


  }
  handleChangePrivacy = e => {
    e.target.value === 'private' ? this.setState({private: true}) : this.setState({private: false});
  }

  render() {
    return (
      <div className="NewHabit">
        <form onSubmit={ this.handleSubmit } autoComplete="off" >
          <h1>New Habit</h1>
          <input className="TitleInput" type="text" id="title" placeholder="title" onChange={ this.handleChange } />
          <h2>Category</h2>
          <div className="Category">
            <input className={this.state.category === 'NONE' ? 'noneChosen none' : 'none'} type="button" value="NONE" onClick={ this.handleChangeCategory } />
            <input className={this.state.category === 'HEALTH' ? 'healthChosen health' : 'health'} type="button" value="HEALTH" onClick={ this.handleChangeCategory }/>
            <input className={this.state.category === 'DIET' ? 'dietChosen diet' : 'diet'} type="button" value="DIET" onClick={ this.handleChangeCategory }/>
            <input className={this.state.category === 'STUDY' ? 'studyChosen study' : 'study'} type="button" value="STUDY" onClick={ this.handleChangeCategory }/>
            <input className={this.state.category === 'WORK' ? 'workChosen work' : 'work'} type="button" value="WORK" onClick={ this.handleChangeCategory }/>
          </div>
          <h2>Privacy</h2>
          <div className="Privacy">
          <input className={this.state.private === false ? 'privacyChosen' : ''} type="button" value="public" onClick={ this.handleChangePrivacy } />
          <input className={this.state.private === true ? 'privacyChosen' : ''} type="button" value="private" onClick={ this.handleChangePrivacy } />
          </div>
          <input className="submit" type="submit" value="Create habit" />
        </form>
      </div>
    )
  } 
}

const mapStateToProps = state => {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps)(NewHabit);