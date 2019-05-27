import React, { Component } from 'react'
import axios from 'axios';
import Popup from "reactjs-popup";
import M from "materialize-css";

class AddComment extends Component {

    state = {
        comment: ''
    }

    addComment = () => {
        console.log(this.props.userLogged)
        console.log(this.props.id)
        console.log(this.state.comment)
        axios.post('/api/comments/addcomment', {
            "creatorID": this.props.userLogged,
            "postID": this.props.id,
            "text": this.state.comment 
        }).then(res => {

        }).catch(err => console.log(err))
    }


    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    clearMsg = () => {
        this.setState({
            comment: ''
        })
    }

    componentDidMount() {
        M.AutoInit();
    }

    render() {

        return (
            <Popup trigger={<button className="btn waves-effect waves-light invite-user-btn habit-page-navigation-btn" ><span>Add comment</span></button>} modal closeOnDocumentClick
                onOpen={this.clearMsg}
                contentStyle={{
                    maxWidth: '80%',
                    width: '500px',
                    backgroundColor: '#f2f2f2',
                    borderRadius: '30px',
                    border: "none"
                }}
                overlayStyle={{
                    background: "rgb(0,0,0, 0.4)"
                }}
            >
                <div className="invite-user-box">
                    <div className="row">
                        <form className="col s10 offset-s1  l8 offset-l2 center-align" onSubmit={() => this.addComment()} autoComplete="off">
                            <h4 className="">Add comment</h4>
                            <div className="input-field inline">
                                <input id="comment" type="text" placeholder="Add comment" onChange={this.handleChange} />
                            </div>
                            <button className="btn" type="submit" value="Add comment">
                                <span>Add comment</span>
                            </button>
                        </form>
                    </div>
                </div>
            </Popup>
        )
    }
}

export default AddComment;