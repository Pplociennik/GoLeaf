import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import NotificationCard from './NotificationCard'
import './Notifications.scss';
import axios from 'axios'
import Popup from "reactjs-popup";
import ReactPaginate from 'react-paginate';

class Notifications extends Component {

    state = {
        notifications: [],
        notificationsToShow: 5,
        page: 0,
        pagesAll: 0
    }

    handlePageClick = data => {
        this.fetchNotifications(data.selected, this.state.notificationsToShow, localStorage.getItem('token'));
    }

    handleNtfCardClicked = (id, url) => {
        this.props.history.push(url) 
    }

    handleNtfCardDeleted = (id, url) => {
        axios.delete(`http://95.108.36.173:8081/api/notifications/ntf/{id}?ntfID=${id}`)
            .then(res => {
                this.setState({notifications: this.state.notifications.filter(ntf => ntf.id !== id)})
                if(this.state.page > 0 && this.state.notifications.length === 0){
                    this.fetchNotifications(this.state.page - 1, this.state.notificationsToShow, localStorage.getItem('token'));
                }
        })
            .catch(err => console.log(err))
    }

    clearNotifications = e => {
        axios.delete(`http://95.108.36.173:8081/api/notifications/clear?userID=${this.props.userLogged}`)
        .then(res => {
            this.setState({notifications: [], pagesAll: 0})
        }).catch(err => console.log(err))
    }

    fetchNotifications(page, toShow, token){
        axios.get(`http://95.108.36.173:8081/api/notifications/user/paging?pageNr=${page}&objectsNr=${toShow}&token=${token}`)
        .then(res => {
                this.setState({
                    notifications: res.data.list,
                    pagesAll: res.data.allPages,
                    page: res.data.pageNr
                })
        })
        .catch(err => {console.log('Error when downloading notifications')})
    }

    componentDidMount() {
        this.fetchNotifications(this.state.page, this.state.notificationsToShow, localStorage.getItem('token'));
    }

    render() {

        let notifications = this.state.notifications;


        let foundNtfs = false;
        let notificationCards = []
        notifications.forEach(ntf => {
            foundNtfs = true;
            notificationCards.push(<NotificationCard key={ntf.id} id={ntf.id} description={ntf.description} date={ntf.date} url={ntf.url} handleNtfCardClicked={() => this.handleNtfCardClicked(ntf.id, ntf.url)} handleNtfCardDeleted={() => this.handleNtfCardDeleted(ntf.id, ntf.url)}/>)
        })

        let ntfsToDisplay = notificationCards;


        if (!foundNtfs) {
            ntfsToDisplay = <div>You have no notifications</div>
        }

        if (localStorage.getItem('token')) {
            return (
                <section className="dashboard-nav">
                <Popup trigger={<button className={foundNtfs ? "btn waves-effect waves-light notifications-modal-btn" : "btn disabled notifications-modal-btn"} ><span role="img" aria-label="icon">🔔</span></button>} modal closeOnDocumentClick
                onOpen={ this.clearMsg }
                contentStyle={{
                    maxWidth: '90%',
                    width: '800px',
                    backgroundColor: '#f2f2f2',
                    padding: "10px",
                    borderRadius: '30px',
                    border: "none"
                }}
                overlayStyle={{
                    background: "rgb(0,0,0, 0.4)"
                }}
            >
                    <div className="notifications-section row">
                        <div className="notifications-header">
                            <h4>My notifications</h4>
                            <button className="btn delete-ntf-btn" onClick={() => this.clearNotifications()}>delete all</button>
                        </div>
                        <ul className="collection">
                            {ntfsToDisplay}
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
            </section>
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

export default withRouter(connect(mapStateToProps)(Notifications));