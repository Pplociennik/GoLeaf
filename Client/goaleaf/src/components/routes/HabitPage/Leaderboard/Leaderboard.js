import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import Popup from "reactjs-popup"
import LeaderboardCard from './LeaderboardCard'
import ReactPaginate from 'react-paginate';

class Leaderboard extends Component {

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
        axios.get(`https://glf-api.herokuapp.com/api/habits/rank/paging?pageNr=${page}&objectsNr=${toShow}&habitID=${habitID}`)
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

    render() {

        let members = this.state.members;

        let foundMembers = false;
        let memberCards = [];

        Object.keys(this.state.members).map(pos => {

            foundMembers = true;
            let member = this.state.members[pos];

            let scorePercentage = Math.round(member.points / this.props.pointsToWin * 100);

            memberCards.push(<LeaderboardCard key={member.id} scorePercentage={scorePercentage} position={pos} userID={member.userID} userLogin={member.userLogin} profilePic={member.imageCode} points={member.points}/>)
        
        })

        let membersToDisplay = memberCards;

        if (localStorage.getItem('token')) {
            return (
                <Popup trigger={<button className="btn waves-effect waves-light invite-user-btn habit-page-navigation-btn" ><span>⚡ Leaderboard</span></button>} modal closeOnDocumentClick
                    contentStyle={{
                        maxWidth: '80%',
                        width: '600px',
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
                            <h4>Leaderboard</h4>
                            <span style={{fontSize: '1.6em'}}>{this.props.pointsToWin}pts 🏁</span>
                        </div>
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

export default withRouter(connect(mapStateToProps)(Leaderboard));