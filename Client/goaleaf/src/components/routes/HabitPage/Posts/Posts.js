import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import Popup from "reactjs-popup"
import PostCard from './PostCard'

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
                this.setState({ posts: this.state.posts.filter(post => post.id !== id) })

            })
            .catch(err => console.log(err))
    }

    componentDidMount() {
        axios.get(`/api/posts/all?token=${localStorage.getItem("token")}&habitID=${this.props.habitID}`)
            .then(res => {
                res.data.forEach(post => {
                    let posts = [...this.state.posts, post]
                    this.setState({
                        posts: posts
                    })
                })
            })
            .catch(err => { console.log('Error when downloading posts') })

        axios.get(`/api/users/user/${this.props.userLogged}`)
            .then(res => {
                this.setState({
                    currentUserLogin: res.data.login
                })
            }
            ).catch(err => console.log(err.response.data.message))
    }

    render() {

        let posts = this.state.posts;

        let foundPosts = false;
        let postCards = []
        posts.forEach(post => {

            foundPosts = true;
            postCards.push(<PostCard key={post.id} id={post.id} currentUserLogin={this.state.currentUserLogin} creatorLogin={post.creatorLogin} postType={post.postType} postText={post.postText} imgName={post.imgName} counter_CLAPPING={post.counter_CLAPPING} counter_WOW={post.counter_WOW} counter_NS={post.counter_NS} counter_TTD={post.counter_TTD} handlePostCardDeleted={() => this.handlePostCardDeleted(post.id)} />)

        })

        let postsToDisplay = postCards.slice(0, this.state.postsToShow);


        if (!foundPosts) {
            postsToDisplay = <div>There are no posts yet</div>
        }

        if (localStorage.getItem('token')) {
            return (
                <section>
                    <div>
                        <ul>
                            {postsToDisplay}
                        </ul>
                        <div>
                            {postCards.length > this.state.postsToShow ? <button onClick={() => this.setState({ postsToShow: this.state.postsToShow + 20 })}>Show more</button> : null}
                        </div>
                    </div>
                </section>
            )
        } else {
            return null
        }
    }
}

const mapStateToProps = state => {
    return {
        habits: state.habits,
        users: state.users,
        members: state.members,
        userLogged: state.userLogged
    }
}

export default withRouter(connect(mapStateToProps)(Posts));