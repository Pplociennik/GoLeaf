import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import Popup from "reactjs-popup"
import './TaskCard.scss';
import {addPost} from './../../../../js/state';
import M from "materialize-css";

class TaskCard extends Component {

    state = {
        taskComment: ''
    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    completeTask = (e, id) => {
        e.preventDefault();
        axios.post('/api/tasks/complete', {
            "comment": this.state.taskComment,
            "habitID": this.props.habitID,
            "taskID": id,
            "token": localStorage.getItem("token")
        })
        .then(res => {
            this.props.addPost(res.data);
        }
        ).catch(err => console.log("Complete Task request failed"))
    }

    render() {

        if (localStorage.getItem('token')) {
            return (
                <Popup trigger={

                <div className="task-card">
                    <a>⚡</a>
                    <div className="task-text-con">
                        <span className="task-title">{this.props.description}</span>
                        <span className="task-points">+{this.props.points}</span>
                    </div>
                        
                </div>

            } modal closeOnDocumentClick
                    contentStyle={{
                        maxWidth: '80%',
                        width: '500px',
                        backgroundColor: '#f2f2f2',
                        borderRadius: '30px',
                        border: "none",
                        padding: '10px'
                    }}
                    overlayStyle={{
                        background: "rgb(0,0,0, 0.4)"
                    }}
                >
                    {close => (
                    <div className="task-popup">
                        <form className="task-popup-form" onSubmit={e => {this.completeTask(e, this.props.id); close()}}>
                            <span className="task-popup-title">{this.props.description}</span>
                            <span className="task-popup-points">🔥 {this.props.points} pts</span>
                            <input className="task-popup-input" id="taskComment" type="text" placeholder="Add a comment" autoComplete="off" onChange={this.handleChange} />
                            <button className="btn task-popup-btn" type="submit" value="Complete task">⚡ Task completed</button>
                        </form>
                    </div>
                    )}
                </Popup>
            )
        } else {
            return null
        }
    }
}

const mapDispatchToProps = dispatch => ({
    addPost: post => dispatch(addPost(post))
})

const mapStateToProps = state => {
    return {
        habits: state.habits,
        users: state.users,
        members: state.members,
        userLogged: state.userLogged
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TaskCard));