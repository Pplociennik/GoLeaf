import React, { Component } from 'react'
import axios from 'axios';
import Popup from "reactjs-popup";
import M from "materialize-css";

class Options extends Component {

  state = {
    msg: null,
    prizePoints: 0,
    canUserInvite: this.props.canUsersInvite,
    private: this.props.private
  }

  changeInvitationPermissions = (e, id) => {
    axios.post(`https://glf-api.herokuapp.com/api/habits/habit/setInvitingPermissions?allowed=${e.target.value}&habitID=${id}`)
        .then(res => {
            window.location.reload();
            //this.setState({canUserInvite: e.target.value});
        }
        ).catch(err => console.log(err.response.data.message))
    }
    
    setHabitPrivacy = (e, id) => {
        if(e.target.value !== this.state.private){
            axios.post(`https://glf-api.herokuapp.com/api/habits/privacy/change?habitID=${id}`)
                .then(res => {
                    window.location.reload();
                    //this.setState({canUserInvite: e.target.value});
                }
                ).catch(err => console.log(err.response.data.message))
            }
        }
    
    componentDidMount() {
        console.log(this.props.canUsersInvite);
        M.AutoInit();
    }

    render() {
    return (
        <Popup trigger={<button className="btn waves-effect waves-light add-task-btn habit-page-navigation-btn" ><span>🧩 options</span></button>} modal closeOnDocumentClick
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
        <div className="add-task-box">
            <div className="row">
                <p>Who can invite users to challenge</p>
                <select defaultValue={this.props.canUsersInvite} className="browser-default" onChange={(e) => this.changeInvitationPermissions(e, this.props.habitID)}>
                    <option value="false">Only admin</option>
                    <option value="true">All members</option>
                </select>
            </div> 
            <div className="row">
                <p>Change challenge privacy</p>
                <select defaultValue={this.props.private} className="browser-default" onChange={(e) => this.setHabitPrivacy(e, this.props.habitID)}>
                    <option value="true">Private</option>
                    <option value="false">Public</option>
                </select>
            </div>            
        </div>
    </Popup>
    )
  } 
}

export default Options;