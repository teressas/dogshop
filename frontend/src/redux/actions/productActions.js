import { createAction } from '../store';
import {
    LOADING,
    SUCCESS,
    ERROR,
    LOAD_PRODUCTS,
    UPDATE_PRODUCTS,
    PRODUCTS_URL
} from '../constants';

export const loadProductsThunk = () => (dispatch) => {
    dispatch(createAction(LOADING, 'loading products...'));

    fetch(PRODUCTS_URL)
        .then(res => res.json())
        .then(data => {
            let products = [];
            data.map(product => {
                return products.push(product)
            })
            dispatch(createAction(SUCCESS, 'Successfully loaded product...'));
            dispatch(createAction(LOAD_PRODUCTS, products));
        })
        .catch((err) => 
            dispatch(createAction(ERROR, 'Issue loading products'))
        );
}

export const updateProductAction = (data) => (dispatch) => {
    if(!data) {
        return '';
    } else {
        dispatch(createAction(UPDATE_PRODUCTS, data));
    }
}