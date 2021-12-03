import React from "react";
import { Routes, Route } from "react-router-dom";
import { connect } from "react-redux";

import CollectionsOverview from '../../components/collections-overview/collections-overview.component'
import CollectionPage from '../collection/collection.component'

import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils'
import { updateCollections } from "../../redux/shop/shop.actions";

import WithSpinner from '../../components/with-spinner/with-spinner.component'

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview)
const CollectionPageWithSpinner = WithSpinner(CollectionPage)

class ShopPage extends React.Component {
    state = {
        loading: true
    }

    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const {updateCollections} = this.props
        // referencing the collection of shop data in firestore
        const collectionRef = firestore.collection('collections')

        // this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
            collectionRef.get().then(snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
            updateCollections(collectionsMap)
            this.setState({loading: false})
        })
    }

    render() {
        const {match} = this.props
        const {loading} = this.state
        return (
            <div className='shop-page'>
                <Routes>
                    <Route path='/' element={<CollectionsOverviewWithSpinner isLoading={loading} /> } />
                    <Route path=':collectionId' element={<CollectionPageWithSpinner isLoading={loading}/>} />
                </Routes>
            </div>
        )
    }
}

export default connect(null, mapDispatchToProps)(ShopPage)