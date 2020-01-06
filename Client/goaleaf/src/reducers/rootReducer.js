const initState = {
    authenticated: false,
    userLogged: null,
    userLoggedLogin: null,
    users: [],
    habits: [],
    finishedHabits: [],
    unfinishedHabits: [],
    wonHabits: [],
    habit: null,
    members: [],
    posts: [],
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
            habits: action.payload
          }
    }
    if(action.type === 'GET_FINISHED_HABITS'){
        return {
            ...state,
            finishedHabits: action.payload
          }
    }
    if(action.type === 'GET_UNFINISHED_HABITS'){
        return {
            ...state,
            unfinishedHabits: action.payload
          }
    }
    if(action.type === 'GET_WON_HABITS'){
        return {
            ...state,
            wonHabits: action.payload
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
    if(action.type === 'GET_POSTS'){
        return {
            ...state,
            posts: action.payload
          }
}
    if(action.type === 'ADD_POST'){
            return {
                ...state,
                posts: [action.payload, ...state.posts]
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