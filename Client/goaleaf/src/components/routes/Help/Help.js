import React, { Component } from 'react';
import './Help.scss';
import NewChallengeGif from './../../../assets/new_challenge.gif';
import InviteUserGif from './../../../assets/invite_user.gif';
import SetGoalGif from './../../../assets/set_goal.gif';
import AddTaskGif from './../../../assets/add_task.gif';
import LeaderboardGif from './../../../assets/leaderboard.gif';

class Help extends Component {

  render() {
    return (
      <div className="help-page">
        <h1 className="help-header">Welcome to Goaleaf, where you can challenge your family and friends into breaking those bad habits 🌿</h1>
        <section className="help-step">
          <h2 className="help-step-header">Create new Challenge 🎯</h2>
          <img className="help-step-gif" src={NewChallengeGif} alt="app step"></img>
          <h3 className="help-step-info">Don't forget to give it a meaningful name</h3>
          <h3 className="help-step-info">When you set the challenge to private only invited users will be able to join it</h3>
        </section>
        <section className="help-step">
          <h2 className="help-step-header">Invite your friends 👨‍👩‍👧‍👦</h2>
          <img className="help-step-gif" src={InviteUserGif} alt="app step"></img>
        </section>
        <section className="help-step">
          <h2 className="help-step-header">Set the Goal 🥇</h2>
          <img className="help-step-gif" src={SetGoalGif} alt="app step"></img>
          <h3 className="help-step-info">100 points seems like a reasonable number but it's your choice</h3>
        </section>
        <section className="help-step">
          <h2 className="help-step-header">Create new Task 🔥</h2>
          <img className="help-step-gif" src={AddTaskGif} alt="app step"></img>
          <h3 className="help-step-info"><span className="bold-text">once for all users:</span> only one person can complete this task, so you gotta be quick</h3>
          <h3 className="help-step-info"><span className="bold-text">once for each user:</span> you can complete this task only once</h3>
          <h3 className="help-step-info"><span className="bold-text">custom:</span> you can specify the recurrence of this task</h3>
        </section>
        <section className="help-step">
          <h2 className="help-step-header">Check your position in the Leaderboard 🏆</h2>
          <img className="help-step-gif" src={LeaderboardGif} alt="app step"></img>
        </section>
      </div>
    )
  } 
}

export default Help;