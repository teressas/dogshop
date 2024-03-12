// API ROUTES
export const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : '';
// export const BASE_URL = ''
export const PRODUCTS_URL = '/api/products';
export const USERS_URL = '/api/users';
export const ORDERS_URL = '/api/orders';
export const PAYPAL_URL = '/api/config/paypal';
export const UPLOAD_URL = '/api/upload';

// USERS
export const UPDATE_USERS = 'UPDATE_USERS';

export const LOADING = 'LOADING',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR';

export const LOAD_USERS = 'LOAD_USERS';

// PRODUCTS
export const UPDATE_PRODUCTS = 'UPDATE_PRODUCTS';
export const LOAD_PRODUCTS = 'LOAD_PRODUCTS';