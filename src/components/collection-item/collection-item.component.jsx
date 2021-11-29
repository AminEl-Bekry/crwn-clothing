import React from "react";
import { connect } from "react-redux";

import { addItem } from "../../redux/cart/cart.actions";

import {
    CollectionItemContainer,
    ItemImage,
    CollectionFooterContainer,
    CustomBtn
} from './collection-item.styles'

const CollectionItem = ({item, addItem}) => {
    const { name, price, imageUrl } = item

    return (
        <CollectionItemContainer>
            <ItemImage className='image' imageUrl={imageUrl} />
            <CollectionFooterContainer>
                <span className="name">{name}</span>
                <span className="price">${price}</span>
            </CollectionFooterContainer>
            <CustomBtn inverted onClick={() => addItem(item)}>Add to cart</CustomBtn>
        </CollectionItemContainer>
    )
}



const mapDispatchToProps = dispath => ({
    addItem: item => dispath(addItem(item))
})

export default connect(null, mapDispatchToProps)(CollectionItem)