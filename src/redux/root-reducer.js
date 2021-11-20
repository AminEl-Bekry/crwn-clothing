import { combineReducers } from "redux";

import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";

export default combineReducers({
    // set the user reducer using the key 'user'
    user: userReducer,
    cart: cartReducer
})