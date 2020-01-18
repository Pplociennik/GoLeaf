import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import './HabitPage.scss'
import InviteMember from './InviteMember/InviteMember'
import AddTask from './AddTask/AddTask'
import AddPost from './AddPost/AddPost'
import AddPrize from './AddPrize/AddPrize'
import Options from './Options/Options'
import { changeDateFormat1 } from '../../../js/helpers'
import { fetchHabit } from '../../../js/state'
import Members from './Members/Members'
import Loader from './../Loader/Loader'
import Leaderboard from './Leaderboard/Leaderboard'
import TasksAll from './TasksAll/TasksAll'
import LoaderSmall from '../LoaderSmall/LoaderSmall';

class HabitPage extends Component {

    state = {
        newMemberLogin: '',
        errorMsg: '',
        permissions: false,
        userBanned: false,
        members: [],
        joinLoading: true
    }

    joinHabit = id => {
        axios.post('https://glf-api.herokuapp.com/api/habits/habit/join', {
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

        axios.delete('https://glf-api.herokuapp.com/api/habits/removemember', {
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

    checkIfUserBanned = id => {
        axios.get(`https://glf-api.herokuapp.com/api/habits/ban/check?userID=${this.props.userLogged}&habitID=${id}`)
        .then(res => {
            this.setState({
                userBanned: res.data
            })
        }
        ).catch(err => console.log(err.response.data.message))
    }

    componentDidMount() {
        this.checkIfUserBanned(this.props.match.params.id);

        this.props.fetchHabit(this.props.match.params.id);

        this.setState({joinLoading: true});
        axios.get(`https://glf-api.herokuapp.com/api/habits/habit/checkPermissions?userID=${this.props.userLogged}&habitID=${parseInt(this.props.match.params.id)}`)
           .then(res => {
                    this.setState({
                        permissions: res.data
                    })
            }).catch(err => {})

        axios.get(`https://glf-api.herokuapp.com/api/habits/habit/members?habitID=${this.props.match.params.id}`)
            .then(res => {
                    this.setState({
                          members: res.data,
                          joinLoading: false
                    })
        }).catch(err => this.setState({joinLoading: false}))
    }

    render() {
        
        let habit = this.props.habit;

        let userIsMember;

        if (habit) {
            this.state.members.find(member => member.userID === this.props.userLogged) ? userIsMember = true : userIsMember = false;
            let isAdmin = false;
            if(this.props.userLogged === habit.creatorID){
                isAdmin = true;
            }

            return (
                <div className={`habit-page ${habit.category}-category`}>
                    <div className="habit-page-header-con">
                        <div className="habit-page-info-con">
                                <div className="habit-page-text-con">
                                    <h1 className="habit-page-title">{habit.title}</h1>
                                    <div className="habit-page-info-blocks">
                                        <div className="habit-page-info-block started-date"><span className="date-span" role="img" aria-label="icon">📆  {changeDateFormat1(habit.startDate)}</span></div>
                                        <div className="habit-page-info-block created-by"><span role="img" aria-label="icon">🙍‍ {habit.creatorLogin}</span></div>
                                        <div className="habit-page-info-block privacy"><span role="img" aria-label="icon">🔒 {habit.private ? 'Private' : 'Public'}</span></div>
                                        <div className={`habit-page-info-block category-${habit.category}`}><span role="img" aria-label="icon">🚩 {habit.category}</span></div>
                                        <div className="habit-page-info-block members-number"><span role="img" aria-label="icon">👭 {habit.membersCount}</span></div>
                                    </div>
                                </div>
                                <div className="habit-page-header-btn-con col s12 l4 center">
                                    {!this.state.joinLoading ? 
                                        <div>
                                            {userIsMember ? <button className=" btn-loading btn-floating btn-large habit-page-header-btn leave-habit-btn" onClick={() => this.leaveHabit(habit.id)}><span role="img" aria-label="icon">🏃‍♀️</span> leave</button> : <button className="btn-floating btn-large pulse habit-page-header-btn join-habit-btn" disabled={this.state.userBanned} onClick={() => this.joinHabit(habit.id)}><span role="img" aria-label="icon">🙋‍♂️</span> join</button>}
                                        </div>
                                    : <LoaderSmall/>}
                                </div>
                        </div>
                    {isAdmin ?
                    <div className="habit-card-delete-btn">
                        <Options habitID={habit.id} canUsersInvite={habit.canUsersInvite} private={habit.private} category={habit.category} title={habit.title} allowDiscussion={habit.allowDiscussion} />
                    </div>
                    : null} 
                    </div>
                    {this.state.userBanned ? <div style={{marginTop: "100px", fontSize: "1.4em"}}>You were kicked from this challenge <span role="img" aria-label="icon">🖐</span></div> : null}
                    {userIsMember ?
                    <section className="habit-page-navigation-con">
                        <div className="habit-page-navigation">
                            {habit.canUsersInvite || isAdmin ? <InviteMember habitID={habit.id} /> : null}
                            <Members habitID={habit.id} isAdmin={isAdmin}/>
                            <AddPrize habitID={habit.id} isFinished={habit.finished} isAdmin={isAdmin} pointsToWin={habit.pointsToWin}/>
                            {habit.pointsToWin !== 1001 ? <AddTask habitID={habit.id} isFinished={habit.finished} isAdmin={isAdmin} pointsToWin={habit.pointsToWin}/> : null}
                            {habit.pointsToWin !== 1001 ? <TasksAll habitID={habit.id} isAdmin={isAdmin} isFinished={habit.finished} pointsToWin={habit.pointsToWin}/> : null}
                            <Leaderboard habitID={habit.id} pointsToWin={habit.pointsToWin}/>
                        </div>
                    </section> : null}
                    <section className="habit-page-dashboard">
                        {userIsMember ? <AddPost habitID = { habit.id } admin={habit.creatorLogin} user={this.props.userLogged} isFinished={habit.finished} pointsToWin={habit.pointsToWin} winner={habit.winner} isAdmin={isAdmin} allowDiscussion={habit.allowDiscussion}/> : null}
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
    habit: state.habit
})
const mapDispatchToProps = dispatch => ({
    fetchHabit: habitID => dispatch(fetchHabit(habitID))
})

export default connect(mapStateToProps, mapDispatchToProps)(HabitPage);