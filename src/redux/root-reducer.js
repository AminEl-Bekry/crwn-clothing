import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist';
// selecting localStorage from redux-persist to use as default storage
import storage from 'redux-persist/lib/storage'

import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";
import directoryReducer from "./directory/directory.reducer";
import shopReducer from "./shop/shop.reducers";

// configuring the localStorage to persist the cart reducer to cache the cart state in the browser
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

const rootReducer = combineReducers({
    // set the user reducer using the key 'user'
    user: userReducer,
    cart: cartReducer,
    directory: directoryReducer,
    shop: shopReducer
})

export default persistReducer(persistConfig, rootReducer)