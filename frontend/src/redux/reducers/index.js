import userReducer from './userReducer';
import productReducer from './productReducer';
import cartReducer from './cartReducer';
import { combineReducers, Reducer } from 'redux';

export default combineReducers({ product: productReducer, user: userReducer, cart: cartReducer });