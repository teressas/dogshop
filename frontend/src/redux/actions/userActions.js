import { createAction } from '../store';
import {
    LOADING,
    SUCCESS,
    ERROR,
    LOAD_USERS,
    UPDATE_USERS,
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
    if(!data) {
        return '';
    } else {
        dispatch(createAction(UPDATE_USERS, data));
    }
}