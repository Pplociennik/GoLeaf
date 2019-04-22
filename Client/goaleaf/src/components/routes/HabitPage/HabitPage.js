import React, { Component } from 'react';
import axios from 'axios';

class HabitPage extends Component {

    state = {
        "id": this.props.id,
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

    /*
    const dateObj = new Date(props.startedOn);
    const day = dateObj.getUTCDate();
    const month = dateObj.getUTCMonth() + 1;
    const year = dateObj.getUTCFullYear();
    const startedOn = day + "/" + month + "/" + year;
    */

    componentDidMount() {
        console.log(this.state)
        axios.get(`/api/habits/habit/members?habitID=${this.state.id}`)
            .then(res => { /* Repair res iteration!!!!!!!!!!!!!!!!!!!*/
                console.log(res.data)
                res.data.map( member => {
                    let members = [...this.state.members, member.userId]
                    this.setState({
                        members: members
                    })
                    console.log(this.state)
                })
            }
            ).catch(err => this.setState({ errorMsg: err.response.data.message }))

        axios.get(`/api/habits/habit/countmembers?habitID=${this.state.id}`)
            .then(res => {
                console.log(res.data)
                this.setState({
                    countMembers: res.data
                })
                console.log(this.state)
            }
            ).catch(err => this.setState({ errorMsg: err.response.data.message }))
    }

    joinHabit = e => {
        e.preventDefault();

        axios.get(`/api/users/user/${this.props.userLogged}`)
            .then(res => {
                this.setState({
                    currentUserLogin: res.data.login,
                })
            }
            ).catch(err => this.setState({ errorMsg: err.response.data.message }))

        axios.post('/api/habits/addmember', {
            "token": localStorage.getItem("token"),
            "habitID": this.state.id,
            "userLogin": this.state.currentUserLogin
        })
            .then(res => {
                this.setState({ errorMsg: 'Successfully joined habit!' })
            }
            ).catch(err => this.setState({ errorMsg: err.response.data.message }))
    }

    leaveHabit = e => {

    }

    render() {
        return (
            <div>
                <div>
                    <button onClick={this.joinHabit} value="Join habit"></button>
                </div>
                <div>
                    <button onClick={this.leaveHabit} value="Leave habit"></button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    userLogged: state.userLogged
})

export default connect(mapStateToProps)(HabitPage);