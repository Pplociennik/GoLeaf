import React, { Component } from 'react'
import { changeDateFormat1 } from './../../../../functions'
import axios from 'axios'
import TempPic from './../../../../assets/default-profile-pic.png'

class MemberCard extends Component {

    state = {
        username: '',
        emailAddress: '',
        login: '',
        id: '',
        picture: '',
        picPreview: ''
    }

    componentDidMount() {

        axios.get(`/api/users/user/${this.props.userID}`)
            .then(res => {
                console.log(res.data)
                this.setState({
                    username: res.data.username,
                    emailAddress: res.data.emailAddress,
                    login: res.data.login,
                    id: res.data.id,
                })
            }
            ).catch(err => console.log(err.response.data.message))
    }

    render() {
        return (
            <li className="collection-item">
                <img src={ TempPic } alt="User avatar" title="User avatar" width="128" height="128" />
                <span className="member-login">{this.state.login}</span>
            </li>
        )
    }

}

export default MemberCard;