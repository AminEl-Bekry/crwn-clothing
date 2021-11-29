import React from "react";
import { Routes, Route } from "react-router-dom";
import { connect } from "react-redux";

import CollectionsOverview from '../../components/collections-overview/collections-overview.component'
import CollectionPage from '../collection/collection.component'

import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils'
import { updateCollections } from "../../redux/shop/shop.actions";

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})

class ShopPage extends React.Component {
    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const {updateCollections} = this.props
        // referencing the collection of shop data in firestore
        const collectionRef = firestore.collection('collections')

        this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
            updateCollections(collectionsMap)
        })
    }

    render() {
        const {match} = this.props
        return (
            <div className='shop-page'>
                <Routes>
                    <Route path='/' element={<CollectionsOverview />}/>
                    <Route path=':collectionId' element={<CollectionPage />}/>
                </Routes>
            </div>
        )
    }
}

export default connect(null, mapDispatchToProps)(ShopPage)