import React, { Component } from 'react'
import axios from 'axios'
import TempPic from './../../../../../assets/default-profile-pic.png'

class CommentCard extends Component {

    state = {
        userLogin: ''
    }

    render() {
        return (
            <li className="comment-card collection-item">
                <div className="comment-profile">
                    <img className="comment-profile-pic" src={ TempPic } alt="User avatar" title="User avatar" />
                    <p className="comment-profile-login">marek</p>
                    <p className="comment-profile-date">12/12/2012</p>
                </div>
                <div className="comment-content">
                    <span>{this.props.commentText}</span>
                </div>

            </li>
        )
    }

}

export default CommentCard;