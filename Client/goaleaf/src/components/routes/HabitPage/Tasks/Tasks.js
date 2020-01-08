import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import Popup from "reactjs-popup"
import TaskCard from './TaskCard'
import './TaskCard.scss';
import ReactPaginate from 'react-paginate';

class Tasks extends Component {

    state = {
        tasks: [],
        pagesAll: 5,
        page: 0,
        tasksToShow: 4
    }

    handlePageClick = data => {
        this.fetchTasks(data.selected, this.state.tasksToShow, this.props.habitID, this.props.userLogged);
    }

    fetchTasks = (page, toShow, habitID, userID) => {
        axios.get(`https://glf-api.herokuapp.com/api/tasks/available/paging?pageNr=${page}&objectsNr=${toShow}&habitID=${habitID}&userID=${userID}`)

            .then(res => {
                this.setState({
                    tasks: res.data.list,
                    pagesAll: res.data.allPages,
                    page: res.data.pageNr
                })
            }).catch(err => console.log(err.response.data.message))
    }

    componentDidMount() {
        this.fetchTasks(this.state.page, this.state.tasksToShow, this.props.habitID, this.props.userLogged);
    }

    render() {

        let tasks = this.state.tasks;
        tasks.reverse();
        tasks.sort((b, a) => (a.active > b.active) ? 1 : ((b.active > a.active) ? -1 : 0));
        console.log(tasks);


        let foundTasks = false;
        let taskCards = [];

        tasks.forEach(task => {

            foundTasks = true;
            if(!(!task.active && task.frequency === 'Once')){
                taskCards.push(<TaskCard key={task.id} id={task.id} description={task.description} points={task.points} creator={task.creator} habitID={this.props.habitID} isFinished={this.props.isFinished} active={task.active} frequency={task.frequency} days={task.daysInterval} refreshDate={task.refreshDate} isAdmin={this.props.isAdmin}/>)
            }
        })
        let tasksToDisplay = taskCards;

        if (!foundTasks) {
            tasksToDisplay = <li style={{display: 'flex', justifyContent: 'center', marginTop: '60px'}}>There are no tasks yet 🤷‍♂️</li>
        } 

        if (localStorage.getItem('token')) {
            return (
                    <div className="row">
                        <ul className="tasks">
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

export default withRouter(connect(mapStateToProps)(Tasks));