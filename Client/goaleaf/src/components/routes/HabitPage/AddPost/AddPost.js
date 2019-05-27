import React, { Component } from 'react'
import './AddPost.scss'
import axios from 'axios';
import { connect } from 'react-redux';
import PhotoIcon from './../../../../assets/photo-icon.png';
import {addPost} from './../../../../index'
class AddPost extends Component {

  state = {
      postText: ''

  }

  handleAddPost = e => {
      e.preventDefault();    
      axios.post('/api/posts/addpost', {
            "habitID": this.props.habitID,
            "postText": this.state.postText.replace(/\n\s*\n/g, '\n'),
            "token": localStorage.getItem('token'),
            "type": "JustText"
      }).then(res => {
          this.setState({postText: ''})
          console.log(res)
          this.props.addPost(res.data);

        }
       ).catch(err => console.log(err))
  }

  handleChange = e => {
    this.setState({[e.target.id]: e.target.value})
  }

  render() {
    
    return (
        <div className="add-post-con row">
            <div className="col s10 m8 offset-s1 offset-m2">
                <ul className="tabs">
                    <li className="post-tab tab col s6 l4 offset-l1"><a className="active" href="#post">Post</a></li>
                    <li className="achievement-tab tab col s6 l4 offset-s1 offset-l2"><a  href="#achievement">Achievement</a></li>
                </ul>
            </div>
            <div id="post" className="col s10 offset-s1 m8 offset-m2">
                <form className="" onSubmit={ this.handleAddPost }>
                    <div className="">
                        <div className="input-field">
                            <textarea id="postText" className="materialize-textarea" placeholder="what's on your mind?" value={ this.state.postText } onChange={ this.handleChange }></textarea>
                        </div>
                    </div>
                    <div className="add-post-buttons-con">
                        <div className="add-post-left-buttons">
                            <img src={ PhotoIcon } alt="add image"></img>
                        </div>
                        <div>
                            <button className="add-post-btn btn" type="submit">Post</button>
                        </div>
                    </div>
                </form>
            </div>
            <div id="achievement" className="col s10 offset-s1 m8 offset-m2">
                <form className="" onSubmit={ this.handleAddPost }>
                    <div className="">
                        <div className="input-field">
                            <textarea id="postText" className="materialize-textarea" placeholder="what have you achieved?" onChange={ this.handleChange }></textarea>
                        </div>
                    </div>
                    <div className="add-post-buttons-con">
                        <div className="add-post-left-buttons">
                            <img src={ PhotoIcon } alt="add image"></img>
                        </div>
                        <div>
                            <button className="add-post-btn btn" type="submit">Post</button>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    )
  } 
}

const mapDispatchToProps = dispatch => ({
    addPost: post => dispatch(addPost(post))
})

export default connect(null, mapDispatchToProps)(AddPost);