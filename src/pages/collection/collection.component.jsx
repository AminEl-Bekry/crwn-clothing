import React from "react";
import { useParams } from 'react-router-dom'
import { useSelector } from "react-redux";

import './collection.styles.scss'

import CollectionItem from '../../components/collection-item/collection-item.component'
import { selectCollection } from "../../redux/shop/shop.selectors";

//const mapStateToProps = (state, ownProps) => ({
    //collection: selectCollection(ownProps.match.params.collectionId)(state)
//})

const CollectionPage = () => {
    const params = useParams();
    const collection = useSelector(selectCollection(params.collectionId))
    return (
        <div className="collection-page">
            <h2 className='title'>{collection.title}</h2>
            <div className="items">
            {
                collection.items.map(item => <CollectionItem key={item.id} item={item}/>)
            }
            </div>
        </div>
    )
}

export default CollectionPage