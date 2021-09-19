import axios from 'axios'

export function fetchUsers() {
  return dispatch => axios.get(`http://localhost:8081/api/users/all`)
      .then(res => {
        dispatch({ type: 'GET_USERS', payload: res.data});
      })
};

export function fetchHabits(pageNr, objectsNr, category, sorting){
  return dispatch => axios.get(`http://localhost:8081/api/habits/all/paging?pageNr=${pageNr}&objectsNr=${objectsNr}&category=${category}&sorting=${sorting}`)
  //return dispatch => axios.get(`http://localhost:8081/api/habits/all/`)
    .then(res => {
      //dispatch({ type: 'GET_HABITS', payload: res.data });
      dispatch({ type: 'GET_HABITS', payload: res.data.list });
      dispatch({ type: 'GET_HABITS_ALL_PAGES', payload: res.data.allPages });
      dispatch({ type: 'GET_HABITS_PAGE', payload: res.data.pageNr });
    })
};

export function fetchFinishedHabits(page, toShow, token){
  return dispatch => axios.get(`http://localhost:8081/api/users/finished/paging?pageNr=${page}&objectsNr=${toShow}&token=${token}`)
    .then(res => {
      dispatch({ type: 'GET_FINISHED_HABITS', payload: res.data.list});
      dispatch({ type: 'GET_FINISHED_HABITS_PAGES', payload: res.data.allPages});
    })
};

export function fetchUnfinishedHabits(page, toShow, token){
  return dispatch => axios.get(`http://localhost:8081/api/users/unfinished/paging?pageNr=${page}&objectsNr=${toShow}&token=${token}`)
    .then(res => {
      dispatch({ type: 'GET_UNFINISHED_HABITS', payload: res.data.list});
      dispatch({ type: 'GET_UNFINISHED_HABITS_PAGES', payload: res.data.allPages});
    })
};

export function fetchWonHabits(page, toShow, token){
  return dispatch => axios.get(`http://localhost:8081/api/users/won/paging?pageNr=${page}&objectsNr=${toShow}&token=${token}`)
    .then(res => {
      dispatch({ type: 'GET_WON_HABITS', payload: res.data.list});
      dispatch({ type: 'GET_WON_HABITS_PAGES', payload: res.data.allPages});
    })
};

export function fetchMembers(){
  return dispatch => axios.get(`http://localhost:8081/api/members/all`)
    .then(res => {
      dispatch({ type: 'GET_MEMBERS', payload: res.data});
    })
};

export function fetchHabit(habitID){
  return dispatch => axios.get(`http://localhost:8081/api/habits/getHabit/{id}?id=${habitID}`)
    .then(res => {
      dispatch({ type: 'GET_HABIT', payload: res.data});
    })
};

export function fetchPosts(habitID, pageNr, objectsNr, type){
  return dispatch =>  axios.get(`http://localhost:8081/api/posts/type/paging?pageNr=${pageNr}&objectsNr=${objectsNr}&habitID=${habitID}&type=${type}`)
    .then(res => {
      if(type === "Task"){
        dispatch({ type: 'GET_POSTS_TASK', payload: res.data.list})
        dispatch({ type: 'GET_POSTS_TASK_PAGE', payload: res.data.pageNr})
        dispatch({ type: 'GET_POSTS_TASK_PAGES_ALL', payload: res.data.allPages})
      } else if (type === "JustText") {
        dispatch({ type: 'GET_POSTS_TEXT', payload: res.data.list})
        dispatch({ type: 'GET_POSTS_TEXT_PAGE', payload: res.data.pageNr})
        dispatch({ type: 'GET_POSTS_TEXT_PAGES_ALL', payload: res.data.allPages})
      }
    })
  }

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