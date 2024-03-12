import {
    LOADING,
    SUCCESS,
    ERROR,
    LOAD_PRODUCTS,
    UPDATE_PRODUCTS
} from '../constants';

const defaultState = {
    request: {
        loading: false,
        success: false,
        message: '',
    },
    productList: [],
};

const productReducer = (prevState = defaultState, action) => {
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
        case LOAD_PRODUCTS: {
            return { ...prevState, productList: [...payload] };
        }
        case UPDATE_PRODUCTS: {
            return { ...prevState, productList: [ ...prevState.productList, { name: payload }] };
        };
        default: return prevState;
    }
}

export default productReducer;