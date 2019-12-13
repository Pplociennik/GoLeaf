import React, { Component } from 'react'
import axios from 'axios';
import Popup from "reactjs-popup";
import M from "materialize-css";

class Options extends Component {

  state = {
    msg: null,
    prizePoints: 0
  }

  changeInvitationPermissions = (e, id) => {
    axios.post(`https://glf-api.herokuapp.com/api/habits/habit/setInvitingPermissions?allowed=${e.target.value}&habitID=${id}`)
        .then(res => {
            //window.location.reload();
        }
        ).catch(err => console.log(err.response.data.message))
    }

    
    componentDidMount() {
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
            <select className="browser-default" value={this.props.canUsersInvite} onChange={(e) => this.changeInvitationPermissions(e, this.props.habitID)}>
                <option value="false">Only admin</option>
                <option value="true">All members</option>
            </select>
            </div>
        </div>
    </Popup>
    )
  } 
}

export default Options;