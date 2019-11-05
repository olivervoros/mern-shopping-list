
export const loginAsync = (event) => {
    return { type: 'LOGIN', event: event }
}

export const login = (event) => {
    event.preventDefault();
    return dispatch => {
        setTimeout(() => { dispatch(loginAsync(event)) }, 5000);
    }
}

export const logout = (event) => {
    return { type: 'LOGOUT', event: event }
}