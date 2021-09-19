import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import './Members.scss'
import Popup from "reactjs-popup"
import MemberCard from './MemberCard'
import ReactPaginate from 'react-paginate';

class Members extends Component {

    state = {
        members: [],
        page: 0,
        membersToShow: 6,
        pagesAll: 5
    }

    handlePageClick = data => {
        this.fetchMembers(this.props.habitID, data.selected, this.state.membersToShow);
    }

    fetchMembers = (habitID, page, toShow) => {
        axios.get(`http://localhost:8080/api/members/habit/paging?pageNr=${page}&objectsNr=${toShow}&habitID=${habitID}`)
        .then(res => {
            this.setState({
                members: res.data.list,
                page: res.data.pageNr,
                pagesAll: res.data.allPages
            })
        }).catch(err => console.log(err.response.data.message))
    }

    componentDidMount() {
        this.fetchMembers(this.props.habitID, this.state.page, this.state.membersToShow);
    }

    banUser = (habitID, userID) => {
        axios.post(`http://localhost:8080/api/habits/ban?userID=${userID}&habitID=${habitID}`)
        .then(res => {
            window.location.reload()
        }).catch(err => console.log(err.response.data.message))
    }

    render() {

        let members = this.state.members;

        let memberCards = [];

        members.forEach(member => {
            memberCards.push(<MemberCard key={member.id} habitID={this.props.habitID} userID={member.userID} userLogin={member.userLogin} isAdmin={this.props.isAdmin} currentUser={this.props.userLogged} profilePic={member.imageCode} banUser={this.banUser} />)

        })

        let membersToDisplay = memberCards;

        if (localStorage.getItem('token')) {
            return (
                <Popup trigger={<button className="btn waves-effect waves-light invite-user-btn habit-page-navigation-btn" ><span role="img" aria-label="icon">👬 Members</span></button>} modal closeOnDocumentClick
                    onOpen={this.clearSearch}
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
                    <div className="members-section row">
                        <h4>Members</h4>
                        <ul className="collection">
                            {membersToDisplay}
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

export default withRouter(connect(mapStateToProps)(Members));