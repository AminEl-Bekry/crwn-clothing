import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import rootReducer from './root-reducer';

// adding an array of middleware to fire when actions are sent
const middlewares = [logger]
// creating our store and passing through the middleware
const store = createStore(rootReducer, applyMiddleware(...middlewares))

export default store