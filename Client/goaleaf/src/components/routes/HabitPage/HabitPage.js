import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import './Members.js';
import Members from './Members.js';

class HabitPage extends Component {

    state = {
        "id": parseInt(window.location.href.substr(window.location.href.lastIndexOf('/') + 1)),
        "habitTitle": '',
        "habitStartDate": '',
        "category": '',
        "frequency": '',
        "creator": '',
        "private": '',
        "currentUserLogin": '',
        "members": [],
        "countMembers": ''
    };

    componentDidMount() {

        axios.get(`/api/habits/getHabit/{id}?id=${this.state.id}`)
            .then(res => {
                let dateObj = new Date(res.data.habitStartDate);
                let day = dateObj.getUTCDate();
                let month = dateObj.getUTCMonth() + 1;
                let year = dateObj.getUTCFullYear();
                let startedOn = day + "/" + month + "/" + year;
                this.setState({
                    habitTitle: res.data.habitTitle,
                    habitStartDate: startedOn,
                    category: res.data.category,
                    frequency: res.data.frequency,
                    creator: res.data.creatorID,
                    private: res.data.private
                })
            }
            ).catch(err => this.setState({ errorMsg: err.response.data.message }))

        axios.get(`/api/habits/habit/members?habitID=${this.state.id}`)
            .then(res => { 
                res.data.map(member => {

                    /**********************member dziala, ale member.userId undefined**************************/

                    console.log(member)
                    console.log(member.userId)

                    /************************************************/

                    let login = ''

                    axios.get(`/api/users/user/${member.userId}`)
                        .then(res => {
                            login = res.data.login
                        }
                        ).catch(err => this.setState({ errorMsg: err.response.data.message }))

                    let members = [...this.state.members, { id: member.userId, login: login }]
                    this.setState({
                        members: members
                    })
                })
            }
            ).catch(err => this.setState({ errorMsg: err.response.data.message }))

        axios.get(`/api/habits/habit/countmembers?habitID=${this.state.id}`)
            .then(res => {
                this.setState({
                    countMembers: res.data
                })
            }
            ).catch(err => this.setState({ errorMsg: err.response.data.message }))

        axios.get(`/api/users/user/${this.props.userLogged}`)
            .then(res => {
                this.setState({
                    currentUserLogin: res.data.login
                })
            }
            ).catch(err => this.setState({ errorMsg: err.response.data.message }))

    }

    joinHabit = e => {
        e.preventDefault();

        axios.post('/api/habits/addmember', {
            "habitID": this.state.id,
            "token": localStorage.getItem("token"),
            "userLogin": this.state.currentUserLogin
        })
            .then(res => {
                this.setState({ errorMsg: 'Successfully joined habit!' })
            }
            ).catch(err => this.setState({ errorMsg: err.response.data.message }))

    }

    leaveHabit = e => {
        e.preventDefault();

        axios.delete('/api/habits/removemember', {
            "habitID": this.state.id,
            "token": localStorage.getItem("token"),
            "userLogin": this.state.currentUserLogin
        })
            .then(res => {
                this.setState({ errorMsg: 'Successfully joined habit!' })
            }
            ).catch(err => this.setState({ errorMsg: err.response.data.message }))

    }

    render() {
        return (
            <div>
                <div>
                    <h1>Title: {this.state.habitTitle}</h1>
                    {this.state.private ? <h2>Private</h2> : <h2>Public</h2>}
                    <h2>Start date: {this.state.habitStartDate}</h2>
                    <h2>Category: {this.state.category}</h2>
                    <h2>Frequency: {this.state.frequency}</h2>
                    <h2>Created by: {this.state.creator}</h2>
                    <div>
                        <h2>Members: {this.state.countMembers}</h2>
                        <div></div>
                    </div>
                </div>
                <div>
                    <button onClick={this.joinHabit}>Join habit</button>
                </div>
                <div>
                    <button onClick={this.leaveHabit}>Leave habit</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    userLogged: state.userLogged,
    members: state.members
})

export default connect(mapStateToProps)(HabitPage);
