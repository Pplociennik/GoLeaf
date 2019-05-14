import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import './HabitPage.scss'
import InviteMember from './InviteMember/InviteMember'
import { changeDateFormat1 } from './../../../functions.js'
import Popup from "reactjs-popup";

class HabitPage extends Component {

    state = {
        newMemberLogin: '',
        errorMsg: ''
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

    render() {
        let habit = this.props.habits.find(habit => habit.id === parseInt(this.props.match.params.id));

        let userIsMember;

        if (habit) {
            habit.members.find(member => member === this.props.userLogged) ? userIsMember = true : userIsMember = false;
            return (
                <div className="habit-page">
                    <section className="habit-page-header-con">
                        <div className="habit-page-info-con">
                            <h1 className="habit-page-title">{habit.habitTitle}</h1>
                            <div className="habit-page-info-blocks">
                                <h2 className="habit-page-info-block started-date"><span><i className="far fa-calendar-alt fa-xs"></i> started on:</span> <span className="date-span"> {changeDateFormat1(habit.habitStartDate)}</span></h2>
                                <h2 className="habit-page-info-block created-by"><span><i className="fas fa-user fa-xs"></i> created by: </span><span> {habit.owner.login}</span></h2>
                                <h2 className="habit-page-info-block privacy"><span><i className={habit.private ? 'fas fa-lock fa-xs' : 'fa fa-lock-open fa-xs'}></i> privacy:</span> <span> {habit.private ? 'Private' : 'Public'}</span></h2>
                            </div>
                            <div className="habit-page-info-blocks">
                                <h2 className={`habit-page-info-block category-${habit.category}`}><span><i className="fas fa-dumbbell fa-sm"></i> category:</span> <span> {habit.category}</span></h2>
                                <h2 className="habit-page-info-block frequency"><span><i className="fas fa-history fa-sm"></i> frequency:</span> <span> {habit.frequency}</span></h2>
                                <h2 className="habit-page-info-block members-number"><span><i className="fas fa-user-friends fa-sm"></i> members:</span> <span> {habit.members.length}</span></h2>
                            </div>
                        </div>
                        <div className="habit-page-header-btn-con">
                            {userIsMember ? <button className="habit-page-header-btn leave-habit-btn" onClick={() => this.leaveHabit(habit.id)}>Leave habit</button> : <button className="habit-page-header-btn join-habit-btn" onClick={() => this.joinHabit(habit.id)}>Join habit</button>}
                        </div>
                    </section>
                    {userIsMember ?
                    <section className="habit-page-main">
                        <div className="habit-page-navigation">
                            <InviteMember habitID={habit.id} />
                        </div>
                    </section> : null}
                </div>
            )
        } else
            return (
                <Redirect to="/" />
            )
    }
}

const mapStateToProps = state => ({
    userLogged: state.userLogged,
    habits: state.habits,
    isLoading: state.isLoading
})

export default connect(mapStateToProps)(HabitPage);
