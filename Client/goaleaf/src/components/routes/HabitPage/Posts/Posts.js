import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import Popup from "reactjs-popup"
import PostCard from './PostCard'
import './Posts.scss'
import {fetchPosts} from './../../../../index'
import {deletePost} from './../../../../index'

class Posts extends Component {

    state = {
        posts: [],
        postsToShow: 20
    }

    handlePostCardDeleted = id => {
        axios.delete(`/api/posts/delete/{id}`, {
            data: {
                "habitID": this.props.habitID,
                "postID": id,
                "token": localStorage.getItem("token")
            }
        })
            .then(res => {
                console.log(`Deleted post ${id}`);
                this.props.deletePost(id);
                

            })
            .catch(err => console.log(err))
    }

    componentDidMount() {
        this.props.fetchPosts(this.props.habitID);

        axios.get(`/api/users/user/${this.props.userLogged}`)
            .then(res => {
                this.setState({
                    currentUserLogin: res.data.login
                })
            }
            ).catch(err => console.log(err.response.data.message))
    }

    render() {
        let posts = this.props.posts;
        posts.sort(function(a, b){
            let keyA = new Date(a.dateOfAddition),
                keyB = new Date(b.dateOfAddition);
            if(keyA > keyB) return -1;
            if(keyA < keyB) return 1;
            return 0;
        });
        let foundPosts = false;
        let postCards = []
        posts.forEach(post => {

            foundPosts = true; 
            postCards.push(<PostCard key={post.id} id={post.id} userLogged={this.props.userLogged} currentUserLogin={this.props.userLoggedLogin} creatorLogin={post.creatorLogin} createdDate={post.dateOfAddition} postType={post.postType} postText={post.postText} imgName={post.imgName} counter_CLAPPING={post.counter_CLAPPING} counter_WOW={post.counter_WOW} counter_NS={post.counter_NS} counter_TTD={post.counter_TTD} handlePostCardDeleted={() => this.handlePostCardDeleted(post.id)} />)

        })
        
        let postsToDisplay = postCards.slice(0, this.state.postsToShow);


        if (!foundPosts) {
            postsToDisplay = <div className="center">There are no posts yet</div>
        }

        return (
                <section className="posts row">
                    <div className="col s12 m8  offset-m2">
                        {postsToDisplay}
                    <div>
                        {postCards.length > this.state.postsToShow ? <div className="show-more-posts-btn-con"><button className="show-more-posts-btn btn center" onClick={() => this.setState({ postsToShow: this.state.postsToShow + 20 })}>Show more</button></div> : null}
                    </div>
                    </div>
                </section>
            )
        
    }
}

const mapStateToProps = state => {
    return {
        posts: state.posts,
        userLogged: state.userLogged,
        userLoggedLogin: state.userLoggedLogin
    }
}
const mapDispatchToProps = dispatch => ({
    fetchPosts: habitID =>  dispatch(fetchPosts(habitID)),
    deletePost: habitID =>  dispatch(deletePost(habitID))
})
export default connect(mapStateToProps, mapDispatchToProps)(Posts);