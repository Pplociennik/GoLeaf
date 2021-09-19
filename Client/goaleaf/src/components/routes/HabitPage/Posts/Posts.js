import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import PostCard from './PostCard'
import './Posts.scss'
import {fetchPosts} from '../../../../js/state'
import {deletePost} from '../../../../js/state'
import ReactPaginate from 'react-paginate';

class Posts extends Component {

    state = {
        postsLoading: true,
        postsText: [],
        postsTextPagesAll: 0,
        postsTextPageNr: 0,
        postsTextToShow: 8,
        
        postsTask: [],
        postsTaskPageNr: 0,
        postsTaskPagesAll: 0,
        postsTaskToShow: 8,

        postsToShow: []
    }

    handlePostTaskPageClick = data => {
        this.fetchPostsTask(this.props.habitID, data.selected, this.state.postsTaskToShow, "Task");
    }
    handlePostTextPageClick = data => {
        this.fetchPostsText(this.props.habitID, data.selected, this.state.postsTextToShow, "JustText");
    }

    handlePostCardDeleted = id => {
        axios.delete(`http://localhost:8081/api/posts/delete/{id}`, {
            data: {
                "habitID": this.props.habitID,
                "postID": id,
                "token": localStorage.getItem("token")
            }
        })
            .then(res => {
                window.location.reload();

            })
            .catch(err => console.log(err))
    }

    fetchPostsText = (habitID, pageNr, objectsNr, type) => {
        this.setState({postsLoading: true});
        this.props.fetchPosts(habitID, pageNr, objectsNr, type).then(res => this.setState({postsLoading: false}))
    }
    fetchPostsTask = (habitID, pageNr, objectsNr, type) => {
        this.setState({postsLoading: true});
        this.props.fetchPosts(habitID, pageNr, objectsNr, type).then(res => this.setState({postsLoading: false}))
    }

    componentDidMount() {  
        this.fetchPostsTask(this.props.habitID, this.state.postsTaskPageNr, this.state.postsTaskToShow, "Task");
        this.fetchPostsText(this.props.habitID, this.state.postsTextPageNr, this.state.postsTextToShow, "JustText");
    }

    render() {
        let posts = [];

        if(this.props.showTasks){
            posts = this.props.postsTask;
        } else {
            posts = this.props.postsText;
        }

        let postCards = []
        posts.forEach(post => {
            if(this.props.showTasks && (post.postType === "Task" || post.postType === "HabitFinished")) {
                postCards.push(<PostCard key={post.id} isFinished={this.props.isFinished} admin={this.props.admin} id={post.id} userLogged={this.props.userLogged} creatorImage={post.creatorImage} currentUserLogin={this.props.userLoggedLogin} creatorLogin={post.creatorLogin} createdDate={post.dateOfAddition} postType={post.postType} taskPoints={post.taskPoints} postText={post.postText} userComment={post.userComment} imgName={post.imgName} counter_CLAPPING={post.counter_CLAPPING} counter_WOW={post.counter_WOW} counter_NS={post.counter_NS} counter_TTD={post.counter_TTD} handlePostCardDeleted={() => this.handlePostCardDeleted(post.id)} />)
            }
            if(!this.props.showTasks && post.postType === "JustText") {
                postCards.push(<PostCard key={post.id} isFinished={this.props.isFinished} id={post.id} admin={this.props.admin} userLogged={this.props.userLogged} creatorImage={post.creatorImage} currentUserLogin={this.props.userLoggedLogin} creatorLogin={post.creatorLogin} createdDate={post.dateOfAddition} postType={post.postType} taskPoints={post.taskPoints} postText={post.postText} userComment={post.userComment} imgName={post.imgName} counter_CLAPPING={post.counter_CLAPPING} counter_WOW={post.counter_WOW} counter_NS={post.counter_NS} counter_TTD={post.counter_TTD} handlePostCardDeleted={() => this.handlePostCardDeleted(post.id)} />)
            }
        })
        
        let postsToDisplay = postCards;


        if (this.state.postsLoading) {
            postsToDisplay =   
            <div className="preloader-wrapper small active" style={{marginTop: "50px"}}>
                <div className="spinner-layer spinner-green-only">
                <div className="circle-clipper left">
                    <div className="circle"></div>
                </div><div className="gap-patch">
                    <div className="circle"></div>
                </div><div className="circle-clipper right">
                    <div className="circle"></div>
                </div>
                </div>
            </div>
        }

        return (
                <section className="posts row">
                    <div className="col s12 m8  offset-m2 center">
                        {postsToDisplay}
                    <div>
                    {this.props.showTasks && this.props.postsTaskPagesAll > 1 ? 
                        <ReactPaginate
                            forcePage={this.props.postsTaskPage}
                            previousLabel={'previous'}
                            nextLabel={'next'}
                            breakLabel={'...'}
                            breakClassName={'break-me'}
                            pageCount={this.props.postsTaskPagesAll}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.handlePostTaskPageClick}
                            containerClassName={'pagination'}
                            subContainerClassName={'pages-pagination'}
                            activeClassName={'active-pagination'}
                            pageClassName={'page-pagination'}
                        /> : null}
                        {!this.props.showTasks && this.props.postsTextPagesAll > 1 ?
                        <ReactPaginate
                            forcePage={this.props.postsTextPage}
                            previousLabel={'previous'}
                            nextLabel={'next'}
                            breakLabel={'...'}
                            breakClassName={'break-me'}
                            pageCount={this.props.postsTextPagesAll}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.handlePostTextPageClick}
                            containerClassName={'pagination'}
                            subContainerClassName={'pages-pagination'}
                            activeClassName={'active-pagination'}
                            pageClassName={'page-pagination'}
                        /> : null}
                     
                    </div>
                    </div>
                </section>
            ) 
    }
}

const mapStateToProps = state => {
    return {
        postsTask: state.postsTask,
        postsText: state.postsText,
        userLogged: state.userLogged,
        userLoggedLogin: state.userLoggedLogin,

        postsTaskPagesAll: state.postsTaskPagesAll,
        postsTaskPage: state.postsTaskPage,
        postsTextPagesAll: state.postsTextPagesAll,
        postsTextPage: state.postsTextPage
    }
}
const mapDispatchToProps = dispatch => ({
    fetchPosts: (habitID, pageNr, objectsNr, type) =>  dispatch(fetchPosts(habitID, pageNr, objectsNr, type)),
    deletePost: habitID =>  dispatch(deletePost(habitID))
})
export default connect(mapStateToProps, mapDispatchToProps)(Posts);