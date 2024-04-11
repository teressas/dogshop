// load cart items
// addItemsToCart
import { ADD_TO_CART, REMOVE_CART_ITEM, CLEAR_CART } from '../constants';
import { createAction } from '../store';

// export const loadCartItems = () => (dispatch) => {
//     dispatch(createAction(LOAD_CART, ));
// }

export const addItemToCart = (product) => (dispatch) => {
    if(product) {
        dispatch(createAction(ADD_TO_CART, product))
    }
}

export const removeItemFromCart = (id) => (dispatch) => {
    if(id) {
        dispatch(createAction(REMOVE_CART_ITEM, id))
    }
}