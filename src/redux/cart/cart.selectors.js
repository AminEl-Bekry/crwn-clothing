import { createSelector } from 'reselect';

// takes the whole state and returns a slice of it, 1 layer deep.
// this is an inout selector
const selectCart = state => state.cart

// creates a selector to select cart items which is now a memoized selector
export const selectCartItems = createSelector(
    // first argument this takes is an array or the select we want.
    [selectCart],
    // second argument is a function that will return the value we want from the selector
    (cart) => cart.cartItems
)

export const selectCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden
)

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce(
        (accumulatedQuantity, cartItem) =>
            accumulatedQuantity + cartItem.quantity,
            0
    )
)

export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce(
        (accumulatedQuantity, cartItem) =>
            accumulatedQuantity + cartItem.quantity * cartItem.price,
            0
    )
)