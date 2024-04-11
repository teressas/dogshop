// API ROUTES
export const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : '';
// export const BASE_URL = ''
export const PRODUCTS_URL = '/api/products';
export const USERS_URL = '/api/users';
export const ORDERS_URL = '/api/orders';
export const PAYPAL_URL = '/api/config/paypal';
export const UPLOAD_URL = '/api/upload';

// FETCH
export const LOADING = 'LOADING',
SUCCESS = 'SUCCESS',
ERROR = 'ERROR';

// USERS
export const UPDATE_USERS = 'UPDATE_USERS';
export const LOAD_USERS = 'LOAD_USERS';
export const LOGIN_USER = 'LOGIN_USER';
export const REGISTER_USER = 'REGISTER_USER';

// PRODUCTS
export const UPDATE_PRODUCTS = 'UPDATE_PRODUCTS';
export const LOAD_PRODUCTS = 'LOAD_PRODUCTS';
export const LOAD_PRODUCT = 'LOAD_PRODUCT';

// CART
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM';
export const CLEAR_CART = 'CLEAR_CART';