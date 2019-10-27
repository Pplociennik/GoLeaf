import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import Popup from "reactjs-popup"
import './TaskCard.scss';

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
            window.location.reload();
        }
        ).catch(err => console.log(err.response.data.message))

    }

    render() {

        if (localStorage.getItem('token')) {
            return (
                <Popup trigger={

                <div className="task-card">
                    <i className="task-icon">⚡</i>
                    <span className="task-title">{this.props.description}</span>
                    <span className="task-points">{this.props.points}</span>
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
                    <div className="task-popup">
                        <form className="task-popup-form" onSubmit={e => this.completeTask(e, this.props.id)}>
                            <span className="task-popup-title">{this.props.description}</span>
                            <span className="task-popup-points">🔥 {this.props.points} pts</span>
                            <input className="task-popup-input" id="taskComment" type="text" placeholder="Add a comment" autoComplete="off" onChange={this.handleChange} />
                            <button className="btn task-popup-btn" type="submit" value="Complete task">⚡ Task completed</button>
                        </form>
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

export default withRouter(connect(mapStateToProps)(TaskCard));