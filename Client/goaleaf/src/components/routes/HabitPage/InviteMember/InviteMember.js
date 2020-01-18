import React, { Component } from 'react'
import './InviteMember.scss'
import axios from 'axios';
import Popup from "reactjs-popup";
import M from "materialize-css";

class InviteMember extends Component {

  state = {
    msg: null,
    userInvited: null,
    disableBtn: false
  }

  addMember = (e, id) => {
    e.preventDefault();

    this.setState({
        msg: <i className="fas fa-spinner fa-spin grey-text"></i>
    })

    axios.post('https://glf-api.herokuapp.com/api/habits/invitemember', {
        "habitID": id,
        "token": localStorage.getItem('token'),
        "url": window.location.href,
        "userLogin": this.state.userInvited
    })
        .then(res => {
            this.setState({ msg: "Invitation sent" });
            this.setState({ disableBtn: false });
        }
        ).catch(err => {
            console.log(err.response.data)
            this.setState({ msg: err.response.data.message });
            this.setState({ disableBtn: false})
        })

    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    
    clearMsg = () => {
        this.setState({
            msg: null
        })
    }

    handleDisableBtn = () => {
        this.setState({disableBtn: true});
      }

    componentDidMount() {
        M.AutoInit();
    }

    render() {

    return (
        <Popup trigger={<button className="btn waves-effect waves-light invite-user-btn habit-page-navigation-btn" ><span role="img" aria-label="icon">🤼 Invite user</span></button>} modal closeOnDocumentClick
            onOpen={ this.clearMsg }
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
        <div className="invite-user-box">
        <div className="row">
            <form className="col s10 offset-s1  l8 offset-l2 center-align" onSubmit={(e) => this.addMember(e, this.props.habitID)} autoComplete="off">
                <h4 className="">Send invitation</h4>
                <div className="input-field inline">
                    <input id="userInvited" maxLength="30" type="text" placeholder="username" onChange={ this.handleChange } />
                    <span className={this.state.msg === 'Invitation sent' ? "helper-text green-text" : "helper-text red-text "}>{this.state.msg}</span>
                </div>
                <button className={this.props.disableBtn ? "btn disable-btn" : "btn"} onClick={ this.handleDisableBtn } type="submit">submit
                </button>
            </form>
            </div>
        </div>
    </Popup>
    )
  } 
}

export default InviteMember;