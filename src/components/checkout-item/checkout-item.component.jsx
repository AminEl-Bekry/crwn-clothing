import React from "react";
import { connect } from "react-redux";

import { clearItemFromCart, addItem, removeItem } from "../../redux/cart/cart.actions";

import {
    CheckoutItemContainer,
    ImageContainer,
    Name,
    Quantity,
    Price,
    RemoveButton
} from './checkout-item.styles'

const mapDispatchToProps = dispatch => ({
    clearItem: item => dispatch(clearItemFromCart(item)),
    addItem: item => dispatch(addItem(item)),
    removeItem: item => dispatch(removeItem(item))
})

const CheckoutItem = ({cartItem, clearItem, addItem, removeItem}) => {
    const { name, imageUrl, price, quantity } = cartItem
    return (
    <CheckoutItemContainer>
        <ImageContainer>
            <img src={imageUrl} alt="item" />
        </ImageContainer>
        <Name>{name}</Name>
        <Quantity>
            <div className="arrow" onClick={() => removeItem(cartItem)}>&#10094;</div>
            <span className="value">{quantity}</span>
            <div className="arrow" onClick={() => addItem(cartItem)}>&#10095;</div>
        </Quantity>
        <Price>${price}</Price>
        <RemoveButton onClick={() => clearItem(cartItem)}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
)}

export default connect(null, mapDispatchToProps)(CheckoutItem)