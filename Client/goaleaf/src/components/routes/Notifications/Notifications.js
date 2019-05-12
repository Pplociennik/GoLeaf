import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import NotificationCard from './NotificationCard'
import axios from 'axios'

class Notifications extends Component {

    state = {
        notifications: [],
        notificationsToShow: 20,
        notificationsSortBy: 'NEWEST'
    }

    handleNtfCardClicked = (id, url) => {
        console.log(url)
        this.props.history.push(url)
    }

    componentDidMount() {
        axios.get(`/api/notifications/usersntf?userID=${this.props.userLogged}`)
            .then(res => {
                res.data.map(ntf => {
                    let notifications = [...this.state.notifications, ntf]
                    this.setState({
                        notifications: notifications
                    })
                })
            })

            .catch(err => console.log(err.response.data.message))
            console.log(this.state)
    }

    render() {

        let notifications = this.state.notifications;

        notifications.sort(function (a, b) {
            let keyA = new Date(a.date),
                keyB = new Date(b.date);
            if (keyA > keyB) return -1;
            if (keyA < keyB) return 1;
            return 0;
        });

        let foundNtfs = false;
        let notificationCards = []
        notifications.forEach(ntf => {

            foundNtfs = true;
            notificationCards.push(<NotificationCard key={ntf.id} id={ntf.id} description={ntf.description} date={ntf.date} url={ntf.url} handleNtfCardClicked={() => this.handleNtfCardClicked(ntf.id, ntf.url)} />)

        })

        let ntfsToDisplay = notificationCards.slice(0, this.state.notificationsToShow);


        if (!foundNtfs) {
            ntfsToDisplay = <div>You have no notifications</div>
        }

        if (localStorage.getItem('token') && foundNtfs) {
            return (
                <section>
                    <h1>My notifications</h1>
                    <div>
                        {ntfsToDisplay}
                    </div>
                    <button onClick={() => this.setState({ notificationsToShow: this.state.notificationsToShow + 20 })}>Show more</button>
                </section>
            )
        } else {
            return (
                <section>
                    <h1>My notifications</h1>
                    <div>
                        {ntfsToDisplay}
                    </div>
                </section>
            );
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

export default withRouter(connect(mapStateToProps)(Notifications));