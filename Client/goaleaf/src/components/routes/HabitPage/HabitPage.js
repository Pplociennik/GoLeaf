import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class HabitPage extends Component {

    state = {
        "id": parseInt(window.location.href.substr(window.location.href.lastIndexOf('/') + 1)),
        "habitTitle": '',
        "habitStartDate": '',
        "category": '',
        "frequency": '',
        "creatorID": '',
        "private": '',
        "currentUserLogin": '',
        "members": [],
        "countMembers": ''
    };

    componentDidMount() {

        axios.get(`/api/habits/getHabit/{id}?id=${this.state.id}`)
            .then(res => {
                this.setState({
                    habitTitle: res.data.habitTitle,
                    habitStartDate: res.data.habitStartDate,
                    category: res.data.category,
                    frequency: res.data.frequency,
                    creatorID: res.data.creatorID,
                    private: res.data.private
                })
            }
            ).catch(err => this.setState({ errorMsg: err.response.data.message }))

        axios.get(`/api/habits/habit/members?habitID=${this.state.id}`)
            .then(res => { /* Repair res iteration!!!!!!!!!!!!!!!!!!!*/
                res.data.map(member => {
                    let members = [...this.state.members, member.userId]
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
                    currentUserLogin: res.data.login,
                })
            }
            ).catch(err => this.setState({ errorMsg: err.response.data.message }))
    }

    joinHabit = e => {
        e.preventDefault();

        axios.post('/api/habits/addmember', {
            "token": localStorage.getItem("token"),
            "habitID": this.state.id,
            "userLogin": this.state.currentUserLogin
        })
            .then(res => {
                this.setState({ errorMsg: 'Successfully joined habit!' })
            }
            ).catch(err => this.setState({ errorMsg: err.response.data.message }))

        console.log(this.state)
    }

    leaveHabit = e => {
        e.preventDefault();
        console.log(this.props.userLogged)
    }

    render() {
        return (
            <div>
                <div>
                    <h1>{this.state.habitTitle}</h1>
                    <h2>{this.state.habitStartDate}</h2>
                    <h2>{this.state.category}</h2>
                    <h2>{this.state.frequency}</h2>
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
