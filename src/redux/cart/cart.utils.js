// grouping same cart items together if user puts multuple of the same item into cart
export const addItemToCart = (cartItems, cartItemToAdd) => {
    // returns null if no id matches
    const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToAdd.id)
    // runs only if matched to item ids together - adding 1 to the item quantity
    if (existingCartItem) {
        return cartItems.map(cartItem =>
            // if items match, add 1 to quantity, if no match, just return cartitem as it is
            cartItem.id === cartItemToAdd.id
            ? { ...cartItem, quantity: cartItem.quantity + 1}
            : cartItem
        )
    }
    // if cart items don't match, return new array adding a base quantity value of 1
    return [...cartItems, {...cartItemToAdd, quantity: 1}]
}

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemToRemove.id
    )
    // If quantity of item to remove is 1, remove the whole item
    if(existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
    }
    // otherwise, remove 1 from quantity and leave the rest of the items unchanged
    return cartItems.map(
        cartItem =>
        cartItem.id === cartItemToRemove.id ?
        { ...cartItems, quantity: cartItem.quantity - 1 }
        : cartItem
    )
}