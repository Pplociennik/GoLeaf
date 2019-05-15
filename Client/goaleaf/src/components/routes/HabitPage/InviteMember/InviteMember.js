import React, { Component } from 'react'
import './InviteMember.scss'
import axios from 'axios';
import Popup from "reactjs-popup";

class InviteMember extends Component {

  state = {
    msg: null,
    userInvited: null
  }

  addMember = (e, id) => {
    e.preventDefault();

    this.setState({
        msg: <i class="fas fa-spinner fa-spin"></i>
    })

    axios.post('/api/habits/invitemember', {
        "habitID": id,
        "token": localStorage.getItem('token'),
        "url": window.location.href,
        "userLogin": this.state.userInvited
    })
        .then(res => {
            this.setState({ msg: "Invitation sent" })
            console.log('Success!!!')
        }
        ).catch(err => {
            this.setState({ msg: err.response.data.message })
            console.log('Failed!!!')
        })

    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    
    clearMsg = () => {
        console.log('dupson')
        this.setState({
            msg: null
        })
    }

    render() {

    return (
        <Popup trigger={<button className="invite-user-btn" ><i className="fas fa-user-friends fa-sm" ></i> Invite user</button>} modal closeOnDocumentClick
            onOpen={ this.clearMsg }
            contentStyle={{
                maxWidth: '80%',
                width: '500px',
                backgroundColor: '#f2f2f2',
                borderRadius: '10px',
                border: "none"
            }}
            overlayStyle={{
                background: "rgb(0,0,0, 0.4)"
            }}
        >
        <div className="add-user-con">
            <form onSubmit={(e) => this.addMember(e, this.props.habitID)} autoComplete="off">
                <i className="fas fa-user-friends fa-3x" ></i>
                <h2 className="invite-user-title"> Invite user</h2>
                <input className="invite-user-form-input" type="text" id="userInvited" placeholder="username" onChange={this.handleChange} />
                <input className="invite-user-form-btn" type="submit" value="Invite user" />
                {this.state.msg}
            </form>
        </div>
    </Popup>
    )
  } 
}

export default InviteMember;