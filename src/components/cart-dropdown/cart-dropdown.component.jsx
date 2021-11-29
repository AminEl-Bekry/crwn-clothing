import React from "react";
import { connect } from "react-redux";

import CartItem from "../cart-item/cart-item.component";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { createStructuredSelector } from 'reselect'

import {
    CartDropdownContainer,
    CartDropdownButton,
    EmptyMessageContainer,
    CartItemsContainer
} from './cart-dropdown.styles'

const CartDropdown = ({cartItems}) => (
    <CartDropdownContainer>
        <CartItemsContainer>
        {
            cartItems.length ? (
            cartItems.map(cartItem => (<CartItem key={cartItem.id} item={cartItem} />
        ))
        ) : (
        <EmptyMessageContainer>Your cart is empty</EmptyMessageContainer>
        )
        }
        </CartItemsContainer>
        <CartDropdownButton>GO TO CHECKOUT</CartDropdownButton>
    </CartDropdownContainer>
)

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
})

export default connect(mapStateToProps)(CartDropdown)