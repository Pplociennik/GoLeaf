import React, { Component } from 'react'
import './AddPost.scss'
import axios from 'axios';

class AddPost extends Component {

  state = {

  }

  render() {
    
    return (
        <div className="add-post-con row">
            <div className="dupa col s12 m8 offset-m2">
                <ul className="tabs z-depth-1">
                    <li className="post-tab tab col s6"><a className="active" href="#post">Post</a></li>
                    <li className="achievement-tab tab col s6"><a  href="#achievement">Achievement</a></li>
                </ul>
            </div>
            <div id="post" className="col s12 m8 offset-m2">
                <form className="">
                    <div className="">
                        <div className="input-field">
                            <textarea id="textarea" className="materialize-textarea" placeholder="what's on your mind?"></textarea>
                        </div>
                    </div>
                    <div className="add-post-buttons-con">
                        <div className="add-post-left-buttons">
                            <i className="material-icons">photo</i>
                        </div>
                        <div>
                            <button className="add-post-btn btn" type="submit">Post</button>
                        </div>
                    </div>
                </form>
            </div>
            <div id="achievement" className="col s12 m8 offset-m2">
                <form className="">
                    <div className="">
                        <div className="input-field">
                            <textarea id="textarea" className="materialize-textarea" placeholder="what have you achieved?"></textarea>
                        </div>
                    </div>
                    <div className="add-achievement-buttons-con">
                        <div className="">
                            
                        </div>
                        <div>
                            <button className="add-achievement-btn btn" type="submit">Post</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
  } 
}

export default AddPost;