import { LOADING, SUCCESS, ERROR, LOGIN_USER } from '../constants';

const defaultState = localStorage.getItem('user') ? localStorage.getItem('user') : {
    request: { loading: false, success: false, message: '' },
    user: {
        id: '',
        name: '',
        email: '',
        password: '',
        isAdmin: false
    },
}

export const authReducer = (prevState = defaultState, action) => {
    const { type, payload } = action;
    Object.freeze(prevState);

    switch(type) {
        case LOADING: {
            return { ...prevState, request: { loading: true, success: false, message: payload }}
        }
        case SUCCESS: {
            return { ...prevState, request: { loading: true, success: true, message: payload }}
        }
        case ERROR: {
            return { ...prevState, request: { loading: false, success: false, message: payload }}
        }
        case LOGIN_USER: {
            return { ...prevState, user: {
                id: payload._id, 
                name: payload.name,
                email: payload.email,
                isAdmin: !!payload.isAdmin
            }}
        }

        default: return prevState; 
    }
}
export default authReducer