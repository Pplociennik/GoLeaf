import axios from 'axios'

const initState = {
    authenticated: false,
    userLogged: null,
    users: []
}

const rootReducer = (state = initState, action) => {
    function parseJwt(token) {
        if (!token) { return; }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }
    const tokenData = parseJwt(action.token)

    if(action.type === 'AUTH_USER'){
        return {
            ...state,
            authenticated: true,
            userLogged: tokenData.sub
        }
    }

    if(action.type === 'GET_USERS'){
            return {
                ...state,
                users: action.payload
              }
    }
    return state;
}   

export default rootReducer;