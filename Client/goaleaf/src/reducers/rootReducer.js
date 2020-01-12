const initState = {
    authenticated: false,
    userLogged: null,
    userLoggedLogin: null,

    habits: [],
    habitsLoading: true,
    habitsAllPages: 0,
    habitsPage: 0,

    finishedHabits: [],
    unfinishedHabits: [],
    wonHabits: [],
    finishedHabitsPages: 0,
    unfinishedHabitsPages: 0,
    wonHabitsPages: 0,

    finishedHabitsLoading: true,
    unfinishedHabitsLoading: true,
    wonHabitsLoading: true,

    
    habit: null,
    members: [],

    postsTask: [],
    postsTaskPagesAll: 0,
    postsTaskPage: 0,

    postsText: [],
    postsTextPagesAll: 0,
    postsTextPage: 0,

    isLoading: true
}

const rootReducer = (state = initState, action) => {
    function parseJwt(token) {
        if (!token) { return; }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }
    const tokenData = parseJwt(action.token);


    console.log(action)
    if(action.type === 'VALIDATE_USER'){
        return {
            ...state,
            authenticated: true,
            userLogged: parseInt(tokenData.sub),
            userLoggedLogin: tokenData.Login,
            isLoading: false
        }
    }
    if(action.type === 'INVALIDATE_USER'){
        localStorage.removeItem('token');
        return {
            ...state,
            authenticated: false,
            userLogged: null,
            userLoggedLogin: null,
            isLoading: false
        }
    }

    if(action.type === 'GET_HABITS'){
        return {
            ...state,
            habitsLoading: false,
            habits: action.payload
          }
    }
    if(action.type === 'GET_HABITS_ALL_PAGES'){
        return {
            ...state,
            habitsAllPages: action.payload
          }
    }
    if(action.type === 'GET_HABITS_PAGE'){
        return {
            ...state,
            habitsPage: action.payload
          }
    }
    if(action.type === 'GET_FINISHED_HABITS'){
        return {
            ...state,
            finishedHabitsLoading: false,
            finishedHabits: action.payload
          }
    }
    if(action.type === 'GET_FINISHED_HABITS_PAGES'){
        return {
            ...state,
            finishedHabitsPages: action.payload
          }
    }
    if(action.type === 'GET_UNFINISHED_HABITS'){
        return {
            ...state,
            unfinishedHabitsLoading: false,
            unfinishedHabits: action.payload
          }
    }
    if(action.type === 'GET_UNFINISHED_HABITS_PAGES'){
        return {
            ...state,
            unfinishedHabitsPages: action.payload
          }
    }
    if(action.type === 'GET_WON_HABITS'){
        return {
            ...state,
            wonHabitsLoading: false,
            wonHabits: action.payload
          }
    }
    if(action.type === 'GET_WON_HABITS_PAGES'){
        return {
            ...state,
            wonHabitsPages: action.payload
          }
    }
    if(action.type === 'GET_HABIT'){
        return {
            ...state,
            habit: action.payload
          }
    }
    if(action.type === 'GET_MEMBERS'){
        return {
            ...state,
            members: action.payload
          }
    }
    if(action.type === 'GET_USERS'){
            return {
                ...state,
                users: action.payload
              }
    }
    if(action.type === 'IS_LOADED'){
            return {
                ...state,
                isLoading: false
              }
    }
    if(action.type === 'GET_POSTS_TASK'){
        return {
            ...state,
            postsTask: action.payload
          }
    }
    if(action.type === 'GET_POSTS_TASK_PAGE'){
        return {
            ...state,
            postsTaskPage: action.payload
          }
    }
    if(action.type === 'GET_POSTS_TASK_PAGES_ALL'){
        return {
            ...state,
            postsTaskPagesAll: action.payload
          }
    }
    if(action.type === 'GET_POSTS_TEXT'){
        return {
            ...state,
            postsText: action.payload
        }
    }
    if(action.type === 'GET_POSTS_TEXT_PAGE'){
        return {
            ...state,
            postsTextPage: action.payload
        }
    }
    if(action.type === 'GET_POSTS_TEXT_PAGES_ALL'){
        return {
            ...state,
            postsTextPagesAll: action.payload
        }
    }
    if(action.type === 'ADD_POST'){
            return {
                ...state,
              }
    }
    if(action.type === 'DELETE_POST'){
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== action.payload)
              }
    }
    
    return state;
}   

export default rootReducer;