import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import Popup from "reactjs-popup"
import TaskCard from './TaskCard'
import './TaskCard.scss';

class Tasks extends Component {

    state = {
        tasks: []
    }

    componentDidMount() {
        axios.get(`/api/tasks/habit?habitID=${this.props.habitID}`)
            .then(res => {
                this.setState({
                    tasks: res.data
                })
            }).catch(err => console.log(err.response.data.message))
    }

    render() {

        let tasks = this.state.tasks;

        let foundTasks = false;
        let taskCards = [];

        tasks.forEach(task => {

            foundTasks = true;
            taskCards.push(<TaskCard key={task.id} id={task.id} description={task.description} points={task.points} habitID={this.props.habitID}/>)

        })

        let tasksToDisplay = taskCards;

        if (!foundTasks) {
            tasksToDisplay = <li style={{display: 'flex', justifyContent: 'center', marginTop: '110px'}}>There are no tasks yet 🤷‍♂️</li>
        } 

        if (localStorage.getItem('token')) {
            return (
                    <div className="row">
                        <ul className="tasks">
                            {tasksToDisplay}
                        </ul>
                    </div>
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

export default withRouter(connect(mapStateToProps)(Tasks));