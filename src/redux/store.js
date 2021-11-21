import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';

import rootReducer from './root-reducer';

// adding an array of middleware to fire when actions are sent
const middlewares = [logger]
// creating our store and passing through the middleware
const store = createStore(rootReducer, applyMiddleware(...middlewares))
// caches the store in the browser using localStorage to keep the state of cart on reload.
const persistor = persistStore(store)

export { store, persistor }