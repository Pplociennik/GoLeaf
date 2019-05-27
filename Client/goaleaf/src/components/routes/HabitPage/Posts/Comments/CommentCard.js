import React, { Component } from 'react'
import axios from 'axios'
import TempPic from './../../../../../assets/default-profile-pic.png'

class CommentCard extends Component {

    state = {
        userLogin: ''
    }

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
            </li>
        )
    }

}

export default CommentCard;