import { userActionTypes } from "./user.types";

const INITIAL_STATE = {
    currentUser: null
}
// an action accepts a type and a payload
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case userActionTypes.SET_CURRENT_USER:
            return {
                // we always want to spread everything else from the state to keep unchanged
                ...state,
                currentUser: action.payload
            }
        // if none of the action types above match this reducer, we simply return the current, unchanged state
        default:
            return state;
    }
}

export default userReducer