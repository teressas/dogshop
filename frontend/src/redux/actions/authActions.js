import { USERS_URL, LOADING, SUCCESS, ERROR, LOGIN_USER } from '../constants';
import { createAction } from '../store';


export const loginUser = (userData) => (dispatch) => {
    dispatch(createAction(LOADING, 'Sending user data'))
    fetch(`${USERS_URL}/auth/`, {
        method: 'POST',
        contentType: 'application/json',
        body: JSON.stringify(userData)
    })
    .then(res => res.json())
    .then(data => {
        dispatch(createAction(SUCCESS, 'Success'))
        console.log(data)
        dispatch(createAction(LOGIN_USER, data))
    })
    .catch(err => dispatch(createAction(ERROR, 'Issue sending data to server')))
}

