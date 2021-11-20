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
