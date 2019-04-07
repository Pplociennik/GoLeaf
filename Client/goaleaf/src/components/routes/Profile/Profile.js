import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            login: '',
            username: '',
            password: '',
            errorMsg: '',
            picture: null
        };
    }

    handleSubmit = e => {
        e.preventDefault();

        if (this.state.password === '') {
            this.setState({ errorMsg: 'Please set the password' });
            return;
        }
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

    render() {
        let errorMsg = <div>{this.state.errorMsg}</div>
        return (
            <div>
                <h1> Login: {this.state.login} </h1>
                <form>
                    <h1> Avatar: </h1>
                    <input type="file" onChange={this.handlePicture} />
                    <div>
                        <img src={this.state.picture} />
                        <input type="submit" value="Change avatar" />
                    </div>
                </form>

                <form onSubmit={this.handleSubmit} autoComplete="off">
                    <h1> Username: </h1>
                    <input className="InputField" type="text" id="username" placeholder="username" onChange={this.handleChange} />
                    {errorMsg}
                    <div>
                        <input type="submit" value="Change username" />
                    </div>
                </form>

                <form onSubmit={this.handleSubmit} autoComplete="off">
                    <h1> Password: </h1>
                    <input className="InputField" type="password" id="password" placeholder="password" onChange={this.handleChange} />
                    <input className="InputField" type="password" id="repeat_password" placeholder="repeat password" onChange={this.handleChange} />
                    {errorMsg}
                    <div>
                        <input type="submit" value="Change password" />
                    </div>
                </form>
            </div>
        )
    }

}

export default Profile;