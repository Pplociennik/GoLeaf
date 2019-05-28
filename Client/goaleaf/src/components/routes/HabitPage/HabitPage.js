import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import './HabitPage.scss'
import InviteMember from './InviteMember/InviteMember'
import AddPost from './AddPost/AddPost'
import { changeDateFormat1 } from './../../../functions.js'
import Posts from './Posts/Posts'
import Members from './Members/Members'

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
                <div className={`habit-page ${habit.category}-category`}>
                    <section className="habit-page-header-con">
                        <div className="habit-page-info-con">
                                <div className="habit-page-text-con">
                                    <h1 className="habit-page-title">{habit.habitTitle}</h1>
                                    <div className="habit-page-info-blocks">
                                        <div className="habit-page-info-block started-date"><i className="far fa-calendar-alt fa-xs"></i><span className="date-span"> {changeDateFormat1(habit.habitStartDate)}</span></div>
                                        <div className="habit-page-info-block created-by"><i className="fas fa-user fa-xs"></i><span> {habit.owner.login}</span></div>
                                        <div className="habit-page-info-block privacy"><i className={habit.private ? 'fas fa-lock fa-xs' : 'fa fa-lock-open fa-xs'}></i> <span> {habit.private ? 'Private' : 'Public'}</span></div>
                                        <div className={`habit-page-info-block category-${habit.category}`}><i className="fas fa-dumbbell fa-sm"></i><span> {habit.category}</span></div>
                                        <div className="habit-page-info-block members-number"><i className="fas fa-user-friends fa-sm"></i><span> {habit.members.length}</span></div>
                                    </div>
                                </div>
                                <div className="habit-page-header-btn-con col s12 l4 center">
                                    {userIsMember ? <button className="btn-floating btn-large habit-page-header-btn leave-habit-btn" onClick={() => this.leaveHabit(habit.id)}>Leave</button> : <button className="btn-floating btn-large pulse habit-page-header-btn join-habit-btn" onClick={() => this.joinHabit(habit.id)}>Join</button>}
                                </div>
                        </div>
                    </section>
                    {userIsMember ?
                    <section className="habit-page-navigation-con">
                        <div className="habit-page-navigation">
                            <InviteMember habitID={habit.id} />
                            <Members habitID={habit.id}/>
                        </div>
                    </section> : null}
                    <section className="habit-page-dashboard">
                        {userIsMember ? <AddPost habitID = { habit.id } /> : null}
                        {userIsMember ? <Posts habitID={habit.id}/> : null}
                    </section>
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
