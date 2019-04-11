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
        "category": "NONE",
        "frequency": "Daily",
        "isPrivate": this.state.private,
        "members": [
          {
            "doneDates": [
              {}
            ],
            "habits": [
              {
                "category": "NONE",
                "frequency": "Daily",
                "habitStartDate": "",
                "habitTitle": "string",
                "id": 0,
                "members": [
                  {}
                ],
                "private": true
              }
            ],
            "id": 0,
            "userID": this.props.userLogged
          }
        ],
        "startDate": "",
        "title": this.state.title,
        "token": localStorage.getItem('token')

    })
    .then(res => {
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
    let errorMsg = <div className="ErrorMsg">{ this.state.errorMsg }</div>
    
    return (
      <div className="NewHabit">
        <form onSubmit={ this.handleSubmit } autoComplete="off" >
          <h1>New Habit</h1>
          <input className="TitleInput" type="text" id="title" placeholder="what will be your next challenge?" onChange={ this.handleChange } maxLength="40" autoFocus />
          <h2>Be sure to add a category..</h2>
          <div className="Categories">
            <input className={this.state.category === 'NONE' ? 'category noneChosen none' : ' category none'} type="button" value="NONE" onClick={ this.handleChangeCategory } />
            <input className={this.state.category === 'DIET' ? 'category dietChosen diet' : 'category diet'} type="button" value="DIET" onClick={ this.handleChangeCategory }/>
            <input className={this.state.category === 'SPORT' ? 'category sportChosen sport' : 'category sport'} type="button" value="SPORT" onClick={ this.handleChangeCategory }/>
            <input className={this.state.category === 'HEALTH' ? 'category healthChosen health' : 'category health'} type="button" value="HEALTH" onClick={ this.handleChangeCategory }/>
            <input className={this.state.category === 'SOCIAL' ? 'category socialChosen social' : 'category social'} type="button" value="SOCIAL" onClick={ this.handleChangeCategory }/>
            <input className={this.state.category === 'FAMILY' ? 'category familyChosen family' : 'category family'} type="button" value="FAMILY" onClick={ this.handleChangeCategory }/>
            <input className={this.state.category === 'STUDY' ? 'category studyChosen study' : 'category study'} type="button" value="STUDY" onClick={ this.handleChangeCategory }/>
            <input className={this.state.category === 'WORK' ? 'category workChosen work' : 'category work'} type="button" value="WORK" onClick={ this.handleChangeCategory }/>
            <input className={this.state.category === 'MONEY' ? 'category moneyChosen money' : 'category money'} type="button" value="MONEY" onClick={ this.handleChangeCategory }/>
          </div>
          <h2>Want to stay incognito? Set habit as private</h2>
          <div className="Privacy">
          <input className={this.state.private === false ? 'privacyChosen' : ''} type="button" value="public" onClick={ this.handleChangePrivacy } />
          <input className={this.state.private === true ? 'privacyChosen' : ''} type="button" value="private" onClick={ this.handleChangePrivacy } />
          </div>
          <input className="submit" type="submit" value="Create habit" />
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