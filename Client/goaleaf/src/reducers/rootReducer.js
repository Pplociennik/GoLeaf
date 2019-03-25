const initState = {
    authenticated: false,
    userLogged: null
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
    return state;
}

export default rootReducer;