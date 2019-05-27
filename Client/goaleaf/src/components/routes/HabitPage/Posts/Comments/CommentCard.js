import React, { Component } from 'react'
import axios from 'axios'
import TempPic from './../../../../../assets/default-profile-pic.png'

class CommentCard extends Component {

    state = {
        userLogin: ''
    }

<<<<<<< HEAD
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

=======
    componentDidMount() {

        axios.get(`/api/users/user/${this.props.userID}`)
            .then(res => {
                this.setState({
                    userLogin: res.data.login
                })
            }
            ).catch(err => this.setState({ errorMsg: err.response.data.message }))

    }
    render() {
        return (
            <li className="collection-item">
                <img src={ TempPic } alt="User avatar" title="User avatar" width="128" height="128" />
                <p>{this.state.userLogin}</p>
                <span>{this.props.commentText}</span>
>>>>>>> 8542f57002167511c77b43bbd3bc891cb5c85acc
            </li>
        )
    }

}

export default CommentCard;