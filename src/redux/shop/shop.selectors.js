import {createSelector} from 'reselect';
import memoize from 'lodash.memoize';

const selectShop = state => state.shop

export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
)

export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    // get all of the keys from the collections object, then map over the keys array to get the value of our collections object which will return an array of items
    // from that collection
    collections => Object.keys(collections).map(key => collections[key])
)

export const selectCollection = memoize(collectionUrlParam =>
    createSelector(
        [selectCollections],
        collections => collections[collectionUrlParam]
    )
)