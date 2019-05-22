import React, { Component } from 'react'
import { changeDateFormat1 } from './../../../../functions'
import './PostCard.scss'
import TempPic from './../../../../assets/default-profile-pic.png'
import { Dropdown } from 'react-materialize'
import MoreIcon from './../../../../assets/more.png'

class PostCard extends Component {

    render() {
    return (
        <div className="post-card">
            <div className="post-owner">
                <img src={ TempPic  }></img>
                <div className="post-card-owner-info">
                    <span className="post-card-owner">{this.props.creatorLogin}</span>
                    <span className="post-card-date">{changeDateFormat1(this.props.createdDate)}</span>
                </div>
            </div>
            <div className="post-content">
                <p className="post-card-text">{this.props.postText}</p>
            </div>
            {this.props.currentUserLogin === this.props.creatorLogin ? 
                <Dropdown trigger={ <a href="#!" className='post-card-more-btn dropdown-trigger' data-target={this.props.id}><img src={MoreIcon}></img></a>}>
                    <a className="dropdown-item delete-post" href="#!" onClick={() => this.props.handlePostCardDeleted(this.props.id)}>Delete</a>
                </Dropdown>
                : null}
        </div>
    )}
}

export default PostCard;