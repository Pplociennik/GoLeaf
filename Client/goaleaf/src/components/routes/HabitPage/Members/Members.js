import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import './Members.scss'
import Popup from "reactjs-popup"
import MemberCard from './MemberCard'

class Members extends Component {

    state = {
        members: []
    }

    componentDidMount() {
        axios.get(`/api/habits/habit/members?habitID=${this.props.habitID}`)
            .then(res => {
                res.data.forEach(member => {
                    let members = [...this.state.members, member]
                    this.setState({
                        members: members
                    })
                })
            }).catch (err => console.log(err.response.data.message))

    }

    render() {

        let members = this.state.members;

        let foundMembers = false;
        let memberCards = [];

        members.forEach(member => {

            foundMembers = true;
            memberCards.push(<MemberCard key={member.id} userID={member.userID} />)

        })

        let membersToDisplay = memberCards;

        if (!foundMembers) {
            membersToDisplay = <div>There are no members yet</div>
        }

        if (localStorage.getItem('token')) {
            return (
                <Popup trigger={<button className="btn waves-effect waves-light invite-user-btn habit-page-navigation-btn" ><span>Members</span></button>} modal closeOnDocumentClick
                    contentStyle={{
                        maxWidth: '80%',
                        width: '500px',
                        backgroundColor: '#f2f2f2',
                        borderRadius: '30px',
                        border: "none"
                    }}
                    overlayStyle={{
                        background: "rgb(0,0,0, 0.4)"
                    }}
                >
                    <div className="members-section row">
                        <h4>Members</h4>
                        <ul className="collection">
                            {membersToDisplay}
                        </ul>
                    </div>
                </Popup>
            )
        } else {
            return null
        }
    }
}

const mapStateToProps = state => {
    return {
        habits: state.habits,
        users: state.users,
        members: state.members,
        userLogged: state.userLogged
    }
}

export default withRouter(connect(mapStateToProps)(Members));