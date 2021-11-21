import React from "react";
import { connect } from "react-redux";
import { selectCollections } from "../../redux/shop/shop.selectors";
import {createStructuredSelector} from 'reselect'

import CollectionPreview from "../../components/collection-preview/collection-preview.component";

const mapStateToProps = createStructuredSelector({
    collections: selectCollections
})

const ShopPage = ({collections}) => (
    <div className='shop-page'>
        {
            collections.map(({id, ...otherCollectionProps}) => (
                <CollectionPreview key={id} {...otherCollectionProps} />
            ))
        }
    </div>
)



export default connect(mapStateToProps)(ShopPage)