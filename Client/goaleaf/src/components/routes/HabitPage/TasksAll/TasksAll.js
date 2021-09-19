import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import Popup from "reactjs-popup"
import Task from './Task'
import './Task.scss'
import ReactPaginate from 'react-paginate';

class TasksAll extends Component {

    state = {
        tasks: [],
        page: 0,
        pagesAll: 0,
        tasksToShow: 5
    }

    handlePageClick = data => {
        this.fetchTasks(this.props.habitID, data.selected, this.state.tasksToShow);
    }

    fetchTasks = (habitID, page, objectsNr) => {
        axios.get(`http://95.108.36.173:8081/api/tasks/habit/paging?pageNr=${page}&objectsNr=${objectsNr}&habitID=${habitID}`)
        .then(res => {
            this.setState({
                tasks: res.data.list,
                page: res.data.pageNr,
                pagesAll: res.data.allPages
            })
        }).catch(err => console.log(err.response.data.message))
    }

    componentDidMount() {
        this.fetchTasks(this.props.habitID, this.state.page, this.state.tasksToShow);
    }

    render() {

        let tasks = this.state.tasks;
        let taskCards = [];

        tasks.forEach(task => {
            taskCards.push(<Task isAdmin={this.props.isAdmin} isFinished={this.props.isFinished} id={task.id} key={task.id} creator={task.creator} description={task.description} points={task.points} frequency={task.frequency} days={task.daysInterval} date={task.refreshDate} active={task.active}/>) 
        })

        let tasksToDisplay = taskCards;

        if (!taskCards.length) {
            tasksToDisplay = <div style={{textAlign: 'center'}}>There are no tasks yet <span role="img" aria-label="icon">🤷‍♂️</span></div>
        } 

        if (localStorage.getItem('token')) {
            return (
                <Popup trigger={<button className="btn waves-effect waves-light invite-user-btn habit-page-navigation-btn" ><span role="img" aria-label="icon">✅ tasks</span></button>} modal closeOnDocumentClick
                    contentStyle={{
                        maxWidth: '80%',
                        width: '700px',
                        backgroundColor: '#f2f2f2',
                        borderRadius: '30px',
                        border: "none"
                    }}
                    overlayStyle={{
                        background: "rgb(0,0,0, 0.4)"
                    }}
                >
                    <div className="members-section row">
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <h4>Tasks</h4>
                        </div>
                        <ul className="collection" style={{overflow: 'visible'}}>
                            {tasksToDisplay}
                        </ul>
                        {this.state.pagesAll > 1 ?
                        <ReactPaginate
                            forcePage={this.state.page}
                            previousLabel={'previous'}
                            nextLabel={'next'}
                            breakLabel={'...'}
                            breakClassName={'break-me'}
                            pageCount={this.state.pagesAll}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.handlePageClick}
                            containerClassName={'pagination'}
                            subContainerClassName={'pages-pagination'}
                            activeClassName={'active-pagination'}
                            pageClassName={'page-pagination'}
                        /> : null}
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
        userLogged: state.userLogged
    }
}

export default withRouter(connect(mapStateToProps)(TasksAll));