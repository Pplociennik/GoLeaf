import React, { Component } from 'react'
import axios from 'axios';
import Popup from "reactjs-popup";
import M from "materialize-css";
import EditImg from '../../../../assets/edit.png'
import { withRouter } from 'react-router-dom';

class Options extends Component {

  state = {
    msg: null,
    prizePoints: 0,
    canUserInvite: this.props.canUsersInvite,
    private: this.props.private,
    title: this.props.title,
    allowDiscussion: this.props.allowDiscussion
  }

  changeInvitationPermissions = (e, id) => {
    axios.post(`http://95.108.36.173:8081/api/habits/habit/setInvitingPermissions?allowed=${e.target.value}&habitID=${id}`)
        .then(res => {
            window.location.reload();
            //this.setState({canUserInvite: e.target.value});
        }
        ).catch(err => console.log(err.response.data.message))
    }

    changeTitle = (e, id) => {
        axios.put(`http://95.108.36.173:8081/api/habits/name/change?habitID=${id}&newName=${this.state.title}`)
        .then(res => {
            window.location.reload();
        }
        ).catch(err => console.log(err.response.data.message))
    }
    
    setHabitPrivacy = (e, id) => {
        if(e.target.value !== this.state.private){
            axios.post(`http://95.108.36.173:8081/api/habits/privacy/change?habitID=${id}`)
                .then(res => {
                    window.location.reload();
                    //this.setState({canUserInvite: e.target.value});
                }
                ).catch(err => console.log(err.response.data.message))
        }
    }
    setHabitCategory = (e, id) => {
        if(e.target.value !== this.state.category){
            axios.post(`http://95.108.36.173:8081/api/habits/category/change?habitID=${id}&category=${e.target.value}`)
                .then(res => {
                    window.location.reload();
                    //this.setState({canUserInvite: e.target.value});
                }
                ).catch(err => console.log(err.response.data.message))
        }
    }

    setAllowDiscussion = (e, id) => {
        if(e.target.value !== this.state.allowDiscussion) {
            axios.put(`http://95.108.36.173:8081/api/habits/discussion/change?habitID=${id}`)
            .then(res => {
                window.location.reload();
            }
            ).catch(err => console.log(err.response.data.message))
        }
    }

    deleteHabit = id => {
        axios.delete(`http://95.108.36.173:8081/api/habits/habit/remove?habitID=${id}&token=${localStorage.getItem("token")}`)
            .then(res => {
                this.props.history.push('/');
                window.location.reload();
            }
            ).catch(err => {
                this.props.history.push('/');
                window.location.reload();
            })
    }

    handleChange = e => {
        this.setState({
          [e.target.id]: e.target.value
        })
      }

    componentDidMount() {
        this.setState({title: this.props.title});
        M.AutoInit();
    }

    render() {
    return (
        <Popup trigger={<img style={{width: "36px", height: "36px"}} alt="edit" src={ EditImg }></img>} modal closeOnDocumentClick
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
            <div className="row update-challenge-title">
                    <p>Change title</p>
                    <input type="text" id="title" value={this.state.title} className="browser-default" onChange={ this.handleChange } maxLength="49"/>
                    <button className="browser-default" onClick={(e) => this.changeTitle(e, this.props.habitID)}>submit</button>
            </div>
            <div className="row">
                    <p>Change category</p>
                    <select defaultValue={this.props.category} className="browser-default" onChange={(e) => this.setHabitCategory(e, this.props.habitID)}>
                        <option value="NONE">None</option>
                        <option value="DIET">Diet</option>
                        <option value="SPORT">Sport</option>
                        <option value="HEALTH">Health</option>
                        <option value="STUDY">Study</option>
                        <option value="WORK">Work</option>
                        <option value="MONEY">Money</option>
                        <option value="SOCIAL">Social</option>
                        <option value="FAMILY">Family</option>
                    </select>
             </div> 
            <div className="row">
                <p>Change privacy</p>
                <select defaultValue={this.props.private} className="browser-default" onChange={(e) => this.setHabitPrivacy(e, this.props.habitID)}>
                    <option value="true">Private</option>
                    <option value="false">Public</option>
                </select>
            </div>
            <div className="row">
                <p>Who can invite users to challenge</p>
                <select defaultValue={this.props.canUsersInvite} className="browser-default" onChange={(e) => this.changeInvitationPermissions(e, this.props.habitID)}>
                    <option value="false">Only admin</option>
                    <option value="true">All members</option>
                </select>
            </div>
            <div className="row">
                <p>Who can add posts</p>
                <select defaultValue={this.props.allowDiscussion} className="browser-default" onChange={(e) => this.setAllowDiscussion(e, this.props.habitID)}>
                    <option value="true">All members</option>
                    <option value="false">Only admin</option>
                </select>
            </div>
            <div className="row" style={{display: "flex", justifyContent: "center"}}>
                <Popup trigger={
                    <button className="delete-habit-btn">delete challenge</button>
                    } modal closeOnDocumentClick
                            contentStyle={{
                                maxWidth: '80%',
                                width: '500px',
                                backgroundColor: '#f2f2f2',
                                borderRadius: '30px',
                                border: "none",
                                minHeight: '200px'
                            }}
                            overlayStyle={{
                                background: "rgb(0,0,0, 0.4)"
                            }}
                        >
                            {close => (
                            <div className="habit-popup">
                                <div className="delete-habit-title">Are you sure you want to delete this challenge?</div>
                                <div className="delete-habit-buttons">
                                    <button className="delete-habit-btn" onClick={() => this.deleteHabit(this.props.habitID)}>delete</button>
                                    <button className="delete-habit-back" onClick={close}>back</button>
                                </div>
                            </div>
                            )}
                    </Popup> 
            </div>       
        </div>
    </Popup>
    )
  } 
}

export default withRouter(Options);