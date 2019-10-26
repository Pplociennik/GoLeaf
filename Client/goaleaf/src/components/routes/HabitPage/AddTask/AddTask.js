import React, { Component } from 'react'
import './AddTask.scss'
import axios from 'axios';
import Popup from "reactjs-popup";
import M from "materialize-css";

class AddTask extends Component {

  state = {
    msg: null,
    task: null,
    taskPoints: 5
  }

  addTask = (e, id) => {
    e.preventDefault();

    axios.post('/api/tasks/add', {
        "description": this.state.task,
        "habitID": id,
        "points": this.state.taskPoints,
        "token": localStorage.getItem("token")
    })
    .then(res => {
        window.location.reload();
    }
    ).catch(err => console.log(err.response.data.message))

    }

    addTaskPoint = e => {
        e.preventDefault();

        if(this.state.taskPoints < 10) {
            this.setState({taskPoints: this.state.taskPoints + 1})
        }
    }
    subtractTaskPoint = e => {
        e.preventDefault();

        if(this.state.taskPoints > 1) {
            this.setState({taskPoints: this.state.taskPoints - 1})
        }
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

    componentDidMount() {
        M.AutoInit();
    }

    render() {

    return (
        <Popup trigger={<button className="btn waves-effect waves-light add-task-btn habit-page-navigation-btn" ><span>Add Task</span></button>} modal closeOnDocumentClick
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
        <div className="add-task-box">
        <div className="row">
            <form className="col s10 offset-s1  l8 offset-l2 center-align" autoComplete="off">
                <h4 className="">New Task</h4>
                <div className="input-field inline">
                    <input id="task" type="text" placeholder="task description" onChange={ this.handleChange } />
                    <button className="task-points-btn task-points-btn-subtract" onClick={ this.subtractTaskPoint }>-</button>
                    <span className="task-points">{ this.state.taskPoints }</span>
                    <button className="task-points-btn task-points-btn-add" onClick={ this.addTaskPoint }>+</button>
                    <span className={this.state.msg === 'Task added' ? "helper-text green-text" : "helper-text red-text "}>{this.state.msg}</span>
                </div>
                <button className="btn" onClick={(e) => this.addTask(e, this.props.habitID)} type="submit" value="Add Task">
                    <span>Add Task</span>
                </button>
            </form>
            </div>
        </div>
    </Popup>
    )
  } 
}

export default AddTask;