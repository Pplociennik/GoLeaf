import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import Popup from "reactjs-popup"

class CompleteTask extends Component {

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
        console.log(this.state.taskComment)
        console.log(this.props.habitID)
        console.log(id)
        console.log(localStorage.getItem("token"))
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
                <Popup trigger={<button><span>Complete task</span></button>} modal closeOnDocumentClick
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
                    <div>
                        <form onSubmit={e => this.completeTask(e, this.props.id)}>
                            <h4>{this.props.description}</h4>
                            <h3>{this.props.points}</h3>
                            <input id="taskComment" type="text" placeholder="Add a comment" autoComplete="off" onChange={this.handleChange} />
                            <button className="btn" type="submit" value="Complete task">Complete task</button>
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

export default withRouter(connect(mapStateToProps)(CompleteTask));