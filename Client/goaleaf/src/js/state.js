import axios from 'axios'

export function fetchUsers() {
  return dispatch => axios.get(`https://glf-api.herokuapp.com/api/users/all`)
      .then(res => {
        dispatch({ type: 'GET_USERS', payload: res.data});
      })
};

export function fetchHabits(){
  return dispatch => axios.get(`https://glf-api.herokuapp.com/api/habits/all`)
    .then(res => {
      dispatch({ type: 'GET_HABITS', payload: res.data});
    })
};

export function fetchMembers(){
  return dispatch => axios.get(`https://glf-api.herokuapp.com/api/members/all`)
    .then(res => {
      dispatch({ type: 'GET_MEMBERS', payload: res.data});
    })
};

export function fetchHabit(habitID){
  return dispatch => axios.get(`https://glf-api.herokuapp.com/api/habits/getHabit/{id}?id=${habitID}`)
    .then(res => {
      dispatch({ type: 'GET_HABIT', payload: res.data});
    })
};

export function fetchPosts(habitID){
  return dispatch =>  axios.get(`https://glf-api.herokuapp.com/api/posts/all?token=${localStorage.getItem("token")}&habitID=${habitID}`)
    .then(res => {
      dispatch({ type: 'GET_POSTS', payload: res.data})
    })
};

export function deletePost(id){
    return dispatch => dispatch({ type: 'DELETE_POST', payload: id})
};

export function addPost(post){
    return dispatch => dispatch({ type: 'ADD_POST', payload: post})
};

export function isLoaded(){
  return dispatch =>
    dispatch({ type: 'IS_LOADED'});
};