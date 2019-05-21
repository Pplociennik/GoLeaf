import React, { Component } from 'react'
import { changeDateFormat1 } from './../../../../functions'
import axios from 'axios'

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

        axios.get(`/downloadFile/${this.props.userID}`, { responseType: 'arraybuffer' })
            .then(res => {
                const base64 = btoa(
                    new Uint8Array(res.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        '',
                    ),
                );
                this.setState({ picture: res.data, picPreview: "data:;base64," + base64 });
            })

            .catch(err => console.log(err.response.data.message))

    }

    render() {
        return (
            <li>
                <div>
                    <section>
                        <img src={this.state.picPreview} alt="User avatar" title="User avatar" width="128" height="128" />
                        <h4>{this.state.login}</h4>
                    </section>
                </div>
            </li>
        )
    }

}

export default MemberCard;