const initState = {
    authenticated: false,
    userLogged: null,
    users: [],
    habits: []
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
            userLogged: tokenData.sub
        }
    }
    if(action.type === 'INVALIDATE_USER'){
        localStorage.removeItem('token');
        return {
            ...state,
            authenticated: false,
            userLogged: null
        }
    }

    if(action.type === 'GET_USERS'){
            return {
                ...state,
                users: action.payload
              }
    }

    if(action.type === 'GET_HABITS'){
            return {
                ...state,
                habits: action.payload
              }
    }
    return state;
}   

export default rootReducer;