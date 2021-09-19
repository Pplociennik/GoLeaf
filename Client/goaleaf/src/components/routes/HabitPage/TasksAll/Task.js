import React, { Component } from 'react'
import './Task.scss';
import axios from 'axios';
import Popup from "reactjs-popup"

class Task extends Component {

    deleteTask = (e, id) => {
        axios.delete(`http://localhost:8080/api/tasks/task/remove?taskID=${id}`)
        .then(res => {
            window.location.reload();
        }).catch(err => { console.log(err) })
    }

    render() {
        let frequency;
        if(this.props.frequency === 'Once') {
            frequency = <span title="This task can be done once" className="task-card-frequency"><span role="img" aria-label="icon">🔁</span> once for all users</span>
        } else if(this.props.frequency === 'Once4All') {
            frequency = <span title="This task can be done once for each user" className="task-card-frequency"><span role="img" aria-label="icon">🔁</span> once for each user</span>
        } else {
            frequency = <span title="Task recurrence" className="task-card-frequency"><span role="img" aria-label="icon">🔁</span> every {this.props.days} {this.props.days === 1 ? 'day' : 'days'}</span>
        }

            return (
                <li className={this.props.active ? 'task-card collection-item task-admin-card' : 'task-card task-card-inactive collection-item task-admin-card'} style={{fontSize: '0.6em', display: 'flex'}}>
                        <div className="task-text-con">
                            <div>
                                <span className="task-title">{this.props.description}</span>
                                <div style={{marginTop: '10px'}}>
                                    {frequency}
                                </div>
                                
                            </div>
                        </div>  
                        <div className="task-points">+{this.props.points}</div> 
                {this.props.isAdmin ?
                    <Popup trigger={
                        <button className={!this.props.isFinished ? "task-card-delete-btn" : "hide"}><span role="img" aria-label="icon">❌</span></button>
                    } modal closeOnDocumentClick
                            disabled={this.props.isFinished}
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
                            <div className="task-popup">
                                <div className="delete-task-title">Are you sure you want to delete this task?</div>
                                <div className="delete-task-buttons">
                                    <button className="delete-task-btn" onClick={(e) => this.deleteTask(e, this.props.id)}>delete</button>
                                    <button className="delete-task-back" onClick={close}>back</button>
                                </div>
                            </div>
                            )}
                        </Popup>
                    : null}                
                </li>
        )
            }

}

export default Task;