import React, { Component } from 'react'
import './NewHabit.scss'
import { connect } from 'react-redux';
import axios from 'axios';

class NewHabit extends Component {

  state = {
    title: '',
    startsOn: new Date(),
    category: 'NONE',
    invite: [],
    private: false,
    recurrence: 'daily',
    errorMsg: ''
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    axios.post('/api/habits/new-habit', {

          "category": this.state.category,
          "frequency": "Daily",
          "isPrivate": this.state.private,
          "members": [
            {
              "habitID": 0,
              "id": 0,
              "userID": this.props.userLogged
            }
          ],
          "startDate": "2019-04-15T19:31:01.645Z",
          "title": this.state.title,
          "token": localStorage.getItem('token')
        }
    )
    .then(res => {
                  console.log(res);
                  this.props.history.push('/');
                  window.location.reload();
                 }
    ).catch(err => {
                    this.setState({errorMsg: err.response.data.message});
                    console.log(err.response.data.message)
     } )

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
    let errorMsg = <div className="error-msg">{ this.state.errorMsg }</div>
    
    return (
      <div className="new-habit">
        <form className="new-habit-form" onSubmit={ this.handleSubmit } autoComplete="off" >
          <h1 className="new-habit-title">New Habit</h1>
          <input className="new-habit-title-input" type="text" id="title" placeholder="what will be your next challenge?" onChange={ this.handleChange } maxLength="50" autoFocus />
          <h2 className="new-habit-extra-info">Be sure to add a category..</h2>
          <div className="new-habit-categories">
            <input className={this.state.category === 'NONE' ? 'new-habit-category none-chosen none' : ' new-habit-category none'} type="button" value="NONE" onClick={ this.handleChangeCategory } />
            <input className={this.state.category === 'DIET' ? 'new-habit-category diet-chosen diet' : 'new-habit-category diet'} type="button" value="DIET" onClick={ this.handleChangeCategory }/>
            <input className={this.state.category === 'SPORT' ? 'new-habit-category sport-chosen sport' : 'new-habit-category sport'} type="button" value="SPORT" onClick={ this.handleChangeCategory }/>
            <input className={this.state.category === 'HEALTH' ? 'new-habit-category health-chosen health' : 'new-habit-category health'} type="button" value="HEALTH" onClick={ this.handleChangeCategory }/>
            <input className={this.state.category === 'SOCIAL' ? 'new-habit-category social-chosen social' : 'new-habit-category social'} type="button" value="SOCIAL" onClick={ this.handleChangeCategory }/>
            <input className={this.state.category === 'FAMILY' ? 'new-habit-category family-chosen family' : 'new-habit-category family'} type="button" value="FAMILY" onClick={ this.handleChangeCategory }/>
            <input className={this.state.category === 'STUDY' ? 'new-habit-category study-chosen study' : 'new-habit-category study'} type="button" value="STUDY" onClick={ this.handleChangeCategory }/>
            <input className={this.state.category === 'WORK' ? 'new-habit-category work-chosen work' : 'new-habit-category work'} type="button" value="WORK" onClick={ this.handleChangeCategory }/>
            <input className={this.state.category === 'MONEY' ? 'new-habit-category money-chosen money' : 'new-habit-category money'} type="button" value="MONEY" onClick={ this.handleChangeCategory }/>
          </div>
          <h2 className="new-habit-extra-info" >Want to stay incognito? Set habit as private</h2>
          <div className="privacy-con">
          <input className={this.state.private === false ? 'privacy-btn privacy-chosen' : 'privacy-btn'} type="button" value="public" onClick={ this.handleChangePrivacy } />
          <input className={this.state.private === true ? 'privacy-btn privacy-chosen' : 'privacy-btn'} type="button" value="private" onClick={ this.handleChangePrivacy } />
          </div>
          <input className="new-habit-submit-btn" type="submit" value="Create habit" />
          { errorMsg }
        </form>
      </div>
    )
  } 
}

const mapStateToProps = state => {
  return {
    userLogged: state.userLogged
  }
}

export default connect(mapStateToProps)(NewHabit);