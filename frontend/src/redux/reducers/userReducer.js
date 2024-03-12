import {
    LOADING,
    SUCCESS,
    ERROR,
    LOAD_USERS,
    UPDATE_USERS,
} from '../constants';

const defaultState = {
    request: {
        loading: false,
        success: false,
        message: '',
    },
    userList: [],
};

const userReducer = (prevState = defaultState, action) => {
    const { type, payload } = action;
    Object.freeze(prevState);

    switch(type) {
        case LOADING: {
            return {
                ...prevState,
                request: { loading: true, success: false, message: payload },
            };
        }
        case SUCCESS: {
            return {
                ...prevState,
                request: { loading: true, success: true, message: payload },
            };
        }
        case ERROR: {
            return {
                ...prevState,
                request: { loading: false, success: false, message: payload },
            };
        }
        case LOAD_USERS: {
            return { ...prevState, userList: [...payload] };
        }
        case UPDATE_USERS: {
            return { ...prevState,
                userList: [...prevState.userList, { name: payload }],
            }
        };
        default: return prevState;
    }
}

export default userReducer;