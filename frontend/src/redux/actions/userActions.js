import { createAction } from '../store';
import {
    LOADING,
    SUCCESS,
    ERROR,
    LOAD_USERS,
    UPDATE_USERS,
    LOGIN_USER,
    USERS_URL
} from '../constants';

export const loadUsersThunk = () => (dispatch) => {
    dispatch(createAction(LOADING, 'Loading users...'));
    console.log('in loadUserThunk');

    fetch(USERS_URL)
        .then(res => res.json())
        .then(data => {
            let arr = [];
            data.map(user => {
                return arr.push(user);
            });
            dispatch(createAction(SUCCESS, 'Successfully loaded users...'));
            dispatch(createAction(LOAD_USERS, arr));
        })
        .catch((err) =>
            dispatch(createAction(ERROR, 'Issue loading users'))
        );
}

export const updateUserAction = (data) => (dispatch) => {
    if (!data) {
        return '';
    } else {
        dispatch(createAction(UPDATE_USERS, data));
    }
}

export const login = (userData) => async(dispatch) => {
    dispatch(createAction(LOADING, 'loading'))
    try {
        const res = await fetch(`${USERS_URL}/auth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        })
        if(!res.ok) {
            throw new Error('Login Failed')
        }
        const data = await res.json();
        dispatch(createAction(LOGIN_USER, data));
        dispatch(createAction(SUCCESS, 'Login Successful'));

        localStorage.setItem('userInfo', JSON.stringify(data));
        
        return data;
    } catch(error) {
        dispatch(createAction(ERROR, error.message))
        return Promise.reject(error);
    }

    // dispatch(createAction(LOADING, 'Sending user data'))
    // return fetch(`${USERS_URL}/auth`, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json', },
    //     body: JSON.stringify(userData)
    // })
    //     .then(res => {
    //         console.log(userData);
    //         if (!res.ok) {
    //             throw new Error('Failed to log in')
    //         }
    //         return res.json();
    //     })
    //     .then(data => {
    //         dispatch(createAction(SUCCESS, 'Login Success'))
    //         console.log(data)
    //         dispatch(createAction(LOGIN_USER, data))
    //         return data;
    //     })
    //     .catch(err => {
    //         dispatch(createAction(ERROR, err.message))
    //         throw err;
    //     })
}

