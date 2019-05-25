import React, { Component } from 'react'
import { changeDateFormat1 } from './../../../../functions'
import './PostCard.scss'
import TempPic from './../../../../assets/default-profile-pic.png'
import { Dropdown } from 'react-materialize'
import MoreIcon from './../../../../assets/more.png'
import ClapIcon from './../../../../assets/clap.png'
import WowIcon from './../../../../assets/wow.png'
import NtIcon from './../../../../assets/nt.png'
import TtdIcon from './../../../../assets/ttd.png'
import axios from 'axios';

class PostCard extends Component {

    state = {
        userReaction: null,
        reactions: {
            counter_CLAPPING: 0,
            counter_WOW: 0,
            counter_NS: 0,
            counter_TTD: 0
        },
        comments: [],
        showComments: false
    }

    addReaction = reaction => {
        axios.post('/api/posts/post/addreaction', {
            "postID": this.props.id,
            "token": localStorage.getItem('token'),
            "type": reaction
        }).then(res => {
            this.state.userReaction === reaction ?
                this.setState({ userReaction: null }) :
                this.setState({ userReaction: reaction })

            this.setState({
                reactions: res.data
            })
            console.log(res.data)
        }).catch(err => console.log(err))
    }

    showComments = () => {
        axios.get(`/api/comments/getcomments?postID=${this.props.id}`)
            .then(res => {
                this.setState({
                    comments: res.data
                })
            }).catch(err => console.log(err))
        console.log(this.state.comments)

        this.setState({
            showComments: true
        })
    }

    addComment = () => {
        axios.post('/api/comments/addcomment', {
            "creatorID": this.props.userLogged,
            "postID": this.props.id,
            "text": "" ///////////////////////////////////////////
        }).then(res => {

        }).catch(err => console.log(err))
    }

    componentDidMount() {
        console.log(this.props.currentUserLogin)
        axios.get(`/api/posts/presentreaction?postID=${this.props.id}&userLogin=${this.props.currentUserLogin}`)
            .then(res => {
                res ? this.setState({ userReaction: res.data.type.toUpperCase() })
                    : this.setState({ userReaction: null })
            })
            .catch(err => console.log(err))

        this.setState({
            reactions: {
                counter_CLAPPING: this.props.counter_CLAPPING,
                counter_WOW: this.props.counter_WOW,
                counter_NS: this.props.counter_NS,
                counter_TTD: this.props.counter_TTD
            }
        })
    }

    render() {
        console.log(this.state.userReaction)
        return (
            <div className="post-card">
                <div className="post-owner">
                    <img src={TempPic} alt="profile"></img>
                    <div className="post-card-owner-info">
                        <span className="post-card-owner">{this.props.creatorLogin}</span>
                        <span className="post-card-date">{changeDateFormat1(this.props.createdDate)}</span>
                    </div>
                </div>
                <div className="post-content">
                    <p className="post-card-text">{this.props.postText}</p>
                </div>
                <div className="post-bottom-navigation">
                    <div className="post-reactions">
                        <div className="reaction">
                            <img className={!this.state.userReaction || this.state.userReaction === 'CLAPPING' ? "reaction-active" : "reaction-inactive"} src={ClapIcon} alt="clapping reaction" onClick={() => this.addReaction('CLAPPING')}></img>
                            <span className="reaction-counter">{this.state.reactions.counter_CLAPPING}</span>
                        </div>
                        <div className="reaction">
                            <img className={!this.state.userReaction || this.state.userReaction === 'WOW' ? "reaction-active" : "reaction-inactive"} src={WowIcon} alt="wow reaction" onClick={() => this.addReaction('WOW')}></img>
                            <span className="reaction-counter">{this.state.reactions.counter_WOW}</span>
                        </div>
                        <div className="reaction">
                            <img className={!this.state.userReaction || this.state.userReaction === 'NOTHING_SPECIAL' ? "reaction-active" : "reaction-inactive"} src={NtIcon} alt="bored reaction" onClick={() => this.addReaction('NOTHING_SPECIAL')}></img>
                            <span className="reaction-counter">{this.state.reactions.counter_NS}</span>
                        </div>
                        <div className="reaction">
                            <img className={!this.state.userReaction || this.state.userReaction === 'THERES_THE_DOOR' ? "reaction-active" : "reaction-inactive"} src={TtdIcon} alt="there are the doors reaction" onClick={() => this.addReaction('THERES_THE_DOOR')}></img>
                            <span className="reaction-counter">{this.state.reactions.counter_TTD}</span>
                        </div>
                    </div>
                    {/*<button className="show-comments-btn" onClick={() => this.showComments()}>Show comments</button>*/}

                </div>

                {this.props.currentUserLogin === this.props.creatorLogin ?
                    <Dropdown trigger={<a href="#!" className='post-card-more-btn dropdown-trigger' data-target={this.props.id}><img src={MoreIcon}></img></a>}>
                        <a className="dropdown-item delete-post" href="#!" onClick={() => this.props.handlePostCardDeleted(this.props.id)}>Delete</a>
                    </Dropdown>
                    : null}
            </div>
        )
    }
}

export default PostCard;