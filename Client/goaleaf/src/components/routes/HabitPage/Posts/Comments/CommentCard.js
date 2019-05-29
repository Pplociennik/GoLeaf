import React, { Component } from 'react'
import TempPic from './../../../../../assets/default-profile-pic.png'
import { changeDateFormat1 } from './../../../../../functions'
import { Dropdown } from 'react-materialize'
import MoreIcon from './../../../../../assets/more.png'

class CommentCard extends Component {

    state = {
        userLogin: ''
    }

    render() {
        return (
            <li className="comment-card collection-item col s10 offset-s2">
                <div className="comment-profile">
                    <img className="comment-profile-pic" src={TempPic} alt="User avatar" title="User avatar" />
                    <p className="comment-profile-login">{this.props.userLogin}</p>
                    <p className="comment-profile-date">{changeDateFormat1(this.props.date)}</p>
                </div>
                <div className="comment-content">
                    <span>{this.props.commentText}</span>
                    <div>
                        {this.props.currentUserLogin === this.props.userLogin ?
                            <Dropdown trigger={<a href="#!" data-target={this.props.id}><img src={MoreIcon}></img></a>}>
                                <a href="#!" onClick={() => this.props.handleCommentCardDeleted(this.props.id)}>Delete</a>
                            </Dropdown>
                            : null}
                    </div>
                </div>
            </li>
        )
    }

}

export default CommentCard;