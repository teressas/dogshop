// save cart items in localStorage
// use cart utility func to determine total price of product, tax price, shipping price and total cost
// add to cart, remove item from cart, clear cart, save shipping address, save payment method
import { ADD_TO_CART, REMOVE_CART_ITEM } from '../constants';
import { updateCart } from '../../utils/cartUtils';

const defaultState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {
    cartItems: [],
};

const cartReducer = (prevState = defaultState, action) => {
    const { type, payload } = action;
    Object.freeze(prevState);

    switch(type) {
        case ADD_TO_CART: {
            const itemExist = prevState.cartItems.find(x => x._id === payload._id);
            let newCartItems = itemExist ? prevState.cartItems.map(x => x._id === itemExist._id ? payload : x) : [ ...prevState.cartItems, payload ];
            const newState = { ...prevState, cartItems: newCartItems }
            return updateCart(newState)
        }
        case REMOVE_CART_ITEM: {
            const newCartItems = prevState.cartItems.filter(x => x._id !== payload.id)
            const newState = {
                ...prevState,
                cartItems: newCartItems
            }
            return updateCart(newState)
        }
        default: return prevState;
    }
}
export default cartReducer;