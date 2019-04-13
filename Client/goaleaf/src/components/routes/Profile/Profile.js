import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'

class Profile extends Component {

    state = {
        login: '',
        username: '',
        oldPassword: '',
        newPassword: '',
        matchingNewPassword: '',
        id: '',
        emailAddress: '',
        errorMsg: '',
        picture: null,
        delete: false
    };

    handleSubmit = e => {
        e.preventDefault();
        axios.post('/api/users/edit', {
            "token": localStorage.getItem("token"),
            "emailAddress": '',
            "id": this.state.id,
            "matchingNewPassword": this.state.matchingNewPassword,
            "newPassword": this.state.newPassword,
            "oldPassword": this.state.oldPassword,
            "userName": ''
        })
        .then(res => {
                this.setState({ errorMsg: 'Edit successful!' })
            }
            ).catch(err => this.setState({errorMsg: err.response.data.message}))
    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handlePicture = event => {
        this.setState({
            picture: URL.createObjectURL(event.target.files[0])
        })
    }

    handleDelete = event => {
        axios.delete(`/api/users/user/${this.props.userLogged}`)
            .then(res => {
                console.log(res.data)
            }
            ).catch(err => this.setState({ errorMsg: err.response.data.message }))
    }

    componentDidMount() {
        console.log(this.props.userLogged)
        axios.get(`/api/users/user/${this.props.userLogged}`)
            .then(res => {
                console.log(res.data)
                this.setState({
                    username: res.data.username,
                    emailAddress: res.data.emailAddress,
                    login: res.data.login,
                    id: res.data.id
                })
            }
            ).catch(err => this.setState({ errorMsg: err.response.data.message }))
    }


    render() {
        let deleteAccount = ''
        if (this.state.delete === true) {
            deleteAccount =  <div>
                <span>Are you sure you want to delete account?</span>
                <input type="button" value="Delete my account" onClick={this.handleDelete}></input>
            </div>
        }
        let errorMsg = <div>{this.state.errorMsg}</div>
        return (
            <div>
                <section>
                    <h1> Login: {this.state.login} </h1>
                    <h1> Email: {this.state.emailAddress} </h1>
                </section>
                <section>
                    <form onSubmit={this.handleSubmit} autoComplete="off">
                        <div>
                            <h1> Avatar: </h1>
                            <input type="file" onChange={this.handlePicture} />
                            <img src={this.state.picture} />
                            <input type="submit" value="Change picture" />
                        </div>
                        <div>
                            <h1> Password: </h1>
                            <input className="InputField" type="password" id="oldPassword" placeholder="old password" onChange={this.handleChange} />
                            <input className="InputField" type="password" id="newPassword" placeholder="password" onChange={this.handleChange} />
                            <input className="InputField" type="password" id="matchingNewPassword" placeholder="repeat password" onChange={this.handleChange} />
                            <div>
                                <input type="submit" value="Change password" />
                                {errorMsg}
                            </div>
                        </div>

                    </form>
                    <input type="button" value="Delete account" onClick={e => this.setState({
                        delete: true
                    })}/>
                    {deleteAccount}

                </section>
            </div>
        )
    }

}
const mapStateToProps = state => ({
    userLogged: state.userLogged
})

export default connect(mapStateToProps)(Profile);