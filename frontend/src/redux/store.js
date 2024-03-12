import { legacy_createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';

export default legacy_createStore(
    rootReducer,
    {},
    composeWithDevTools(applyMiddleware(thunk))
);

// general action creator
export const createAction = (type, payload) => ({ type, payload });