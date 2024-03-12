import userReducer from './userReducer';
import productReducer from './productReducer';
import { combineReducers, Reducer } from 'redux';

export default combineReducers({ product: productReducer, user: userReducer})