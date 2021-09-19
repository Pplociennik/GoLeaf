import React, { Component } from 'react'
import './Profile.scss'
import { connect } from 'react-redux'
import axios from 'axios'
import Resizer from 'react-image-file-resizer';

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
        confirmDelete: false,
        notifications: true,
        profilePic: null,
        convertedPic: null
    };

    fileChangedHandler(event, callback) {
            Resizer.imageFileResizer(
                event.target.files[0],
                100,
                100,
                'PNG',
                100,
                0,
                uri => {
                    this.setState({convertedPic: uri});
                    callback();
                },
                'base64'
            );
    }

    b64toBlob = dataURI => {
        var byteString = atob(dataURI.split(',')[1]);
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
    
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: 'image/png' });
    }

    handleChangeAvatar = e => {

        if (e.target.files[0].name.match(/.(jpg|jpeg|png|gif)$/i)) {

            this.fileChangedHandler(e, () => {
                const blob = this.b64toBlob(this.state.convertedPic);
                const formData = new FormData();
                formData.append('file', blob);

                axios.post(`http://95.108.36.173:8081/uploadImage?token=${localStorage.getItem("token")}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then(res => {
                        window.location.reload();
                    }
                    ).catch(err => { })
            })
        }
    }

    handlePasswordChange = e => {
        e.preventDefault();
        axios.put('http://95.108.36.173:8081/api/users/edit', {
            "token": localStorage.getItem("token"),
            "emailAddress": '',
            "id": this.state.id,
            "matchingNewPassword": this.state.matchingNewPassword,
            "newPassword": this.state.newPassword,
            "oldPassword": this.state.oldPassword,
            "userName": ''
        })
            .then(res => {
                window.location.reload()
            }
            ).catch(err => this.setState({ errorMsg: err.response.data.message }))
    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleDelete = event => {
        axios.delete(`http://95.108.36.173:8081/api/users/user/${this.props.userLogged}`)
            .then(res => window.location.reload()
            ).catch(err => { })
    }

    setNotifications = () => {
        let notificationsStatus;
        this.state.notifications ? notificationsStatus = false : notificationsStatus = true
        axios.post('http://95.108.36.173:8081/api/users/setntf', {
            "newNotificationsStatus": notificationsStatus,
            "token": localStorage.getItem("token"),
            "userID": this.props.userLogged
        })
            .then(res => { 
                           this.setState({notifications: res.data.notifications})
            }
            ).catch(err => console.log(err.response.data.message))
    }

    componentDidMount() {
        axios.get(`http://95.108.36.173:8081/api/users/user/${this.props.userLogged}`)
            .then(res => {
                this.setState({
                    username: res.data.username,
                    emailAddress: res.data.emailAddress,
                    login: res.data.login,
                    id: res.data.id,
                    notifications: res.data.notifications,
                    profilePic: res.data.imageCode
                })
            }
            ).catch(err => this.setState({ errorMsg: err.response.data.message }))

    }


    render() {
        
        let deleteAccount = ''
        if (this.state.confirmDelete === true) {
            deleteAccount = <div className="confirm-delete-profile">
                <span>Are you sure you want to delete your account?</span>
                <button className="confirm-delete-profile-btn" onClick={this.handleDelete}>delete my account</button>
            </div>
        }
        let errorMsg = <div className="error-msg">{this.state.errorMsg}</div>
        return (
            <div className="profile">
                <section className="profile-photo">
                    <img className="profile-img" src={`data:image/png;base64,${this.state.profilePic}`} alt="user avatar" title="Change avatar" onClick={() => this.refs.uploadPhoto.click()} />
                    <input className="profile-img-input" type="file" accept="image/x-png,image/gif,image/jpeg" onChange={this.handleChangeAvatar} ref="uploadPhoto" style={{ display: "none" }} />
                </section>
                <section className="profile-info">
                    <h1 className="profile-info-login">{this.state.login} </h1>
                    <div className="profile-info-email">
                        <span>{this.state.emailAddress}</span>
                        <button className={this.state.notifications ? 'notifications-btn notifications-btn-true' : 'notifications-btn notifications-btn-false'} onClick={ this.setNotifications } title={this.state.notifications ? "Disable notifications" : "Allow notifications"}><i className={this.state.notifications ? 'fas fa-bell' : 'fas fa-bell-slash'}></i></button>
                    </div>

                </section>
                <section className="change-password">
                    <form className="change-password-form" onSubmit={this.handlePasswordChange} autoComplete="off">
                        <h5 className="change-password-title">Change password</h5>
                        <input className="password-input" maxLength="25" id="oldPassword" type="password" placeholder="old password" onChange={this.handleChange} />
                        <input className="password-input" maxLength="25" id="newPassword" type="password" placeholder="new password" onChange={this.handleChange} />
                        <input className="password-input" maxLength="25" id="matchingNewPassword" type="password" placeholder="repeat new password" onChange={this.handleChange} />
                        <input className="change-password-btn" type="submit" value="submit" />
                        {errorMsg}
                    </form>
                </section>
                <section className="delete-profile">
                    <input className="delete-profile-btn" type="button" value="delete profile" onClick={e => this.setState({ confirmDelete: true })} />
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