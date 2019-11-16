import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import './HabitPage.scss'
import InviteMember from './InviteMember/InviteMember'
import AddTask from './AddTask/AddTask'
import AddPost from './AddPost/AddPost'
import AddPrize from './AddPrize/AddPrize'
import { changeDateFormat1 } from '../../../js/helpers'
import Posts from './Posts/Posts'
import Tasks from './Tasks/Tasks'
import Members from './Members/Members'
import Loader from './../Loader/Loader'
import Leaderboard from './Leaderboard/Leaderboard'

class HabitPage extends Component {

    state = {
        newMemberLogin: '',
        errorMsg: '',
        permissions: false
    }

    joinHabit = id => {
        axios.post('/api/habits/habit/join', {
            "habitID": id,
            "token": localStorage.getItem("token"),
            "userID": this.props.userLogged
        })
            .then(res => {
                window.location.reload();
            }
            ).catch(err => console.log(err.response.data.message))
    }

    leaveHabit = id => {

        axios.delete('/api/habits/removemember', {
            data: {
                "habitID": id,
                "token": localStorage.getItem("token"),
                "userID": this.props.userLogged
            }
        })
            .then(res => {
                this.props.history.push('/');
                window.location.reload();
            }
            ).catch(err => console.log(err.response.data.message))

    }

    handleChange = e => {
        e.preventDefault();
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    componentDidMount() {
        axios.get(`/api/habits/habit/checkPermissions?userID=${this.props.userLogged}&habitID=${parseInt(this.props.match.params.id)}`)
            .then(res => {
                    this.setState({
                        permissions: res.data
                    })
            }).catch(err => console.log(err))
            console.log(localStorage.getItem('token'))
    }

    render() {
        let habit = this.props.habits.find(habit => habit.id === parseInt(this.props.match.params.id));

        let userIsMember;

        if (habit && this.state.permissions) {
            habit.members.find(member => member === this.props.userLogged) ? userIsMember = true : userIsMember = false;
            return (
                <div className={`habit-page ${habit.category}-category`}>
                    <span className="habit-page-header-con">
                        <div className="habit-page-info-con">
                                <div className="habit-page-text-con">
                                    <h1 className="habit-page-title">{habit.title}</h1>
                                    <div className="habit-page-info-blocks">
                                        <div className="habit-page-info-block started-date">📆<span className="date-span">  {changeDateFormat1(habit.startDate)}</span></div>
                                        <div className="habit-page-info-block created-by">🙍‍ <span> {habit.owner.login}</span></div>
                                        <div className="habit-page-info-block privacy">🔒 <span> {habit.isPrivate ? 'Private' : 'Public'}</span></div>
                                        <div className={`habit-page-info-block category-${habit.category}`}>🚩 <span> {habit.category}</span></div>
                                        <div className="habit-page-info-block members-number">👭 <span> {habit.members.length}</span></div>
                                    </div>
                                </div>
                                <div className="habit-page-header-btn-con col s12 l4 center">
                                    {userIsMember ? <button className="btn-floating btn-large habit-page-header-btn leave-habit-btn" onClick={() => this.leaveHabit(habit.id)}>🏃‍♀️ leave</button> : <button className="btn-floating btn-large pulse habit-page-header-btn join-habit-btn" onClick={() => this.joinHabit(habit.id)}>🙋‍♂️ join</button>}
                                </div>
                        </div>
                    </span>
                    {userIsMember ?
                    <section className="habit-page-navigation-con">
                        <div className="habit-page-navigation">
                            <InviteMember habitID={habit.id} />
                            <Members habitID={habit.id}/>
                            <AddTask habitID={habit.id}/>
                            <AddPrize habitID={habit.id}/>
                            <Leaderboard habitID={habit.id}/>
                        </div>
                    </section> : null}
                    {(habit.pointsToWin && !habit.isFinished) ?
                    <section>
                        <p>Get {habit.pointsToWin} points to win!</p>
                    </section> : null}
                    {(habit.pointsToWin && habit.isFinished) ?
                    <section>
                        <p>Challenge finished by {habit.winner}!</p>
                    </section> : null}
                    <section className="habit-page-dashboard">
                        {userIsMember ? <AddPost habitID = { habit.id } /> : null}
                    </section>
                </div>
            )
        } else
            return (
                <Loader />
            )
    } 
}

const mapStateToProps = state => ({
    userLogged: state.userLogged,
    habits: state.habits
})

export default connect(mapStateToProps)(HabitPage);
