import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import Popup from "reactjs-popup"
import PostCard from './PostCard'

class Posts extends Component {

    state = {
        posts: [],
        postsToShow: 20,
        postsSortBy: 'NEWEST'
    }

    handlePostCardEdited = id => {
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
    }

    render() {

        let posts = this.state.posts;
        /*
                posts.sort(function (a, b) {
                    let keyA = new Date(a.date),
                        keyB = new Date(b.date);
                    if (keyA > keyB) return -1;
                    if (keyA < keyB) return 1;
                    return 0;
                });
        */
        let foundPosts = false;
        let postCards = []
        posts.forEach(post => {

            foundPosts = true;
            postCards.push(<PostCard key={post.id} id={post.id} handlePostCardEdited={() => this.handlePostCardEdited(post.id)} handlePostCardDeleted={() => this.handlePostCardDeleted(post.id)} />)

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